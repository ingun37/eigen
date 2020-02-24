import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { State, matrixAction, Shape, chooseShapeAction } from '../reducers';
import { Store } from '@ngrx/store';
import { CellDirective, CellWheelInfo } from '../cell.directive';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  @ViewChildren(CellDirective) cellChildren !: QueryList<CellDirective>;

  shapes: ShapeData[] = [
    new ShapeData("Cube", Shape.Cube, true),
    new ShapeData("Urchin", Shape.Urchin, false),
  ]
  formGroup = new FormGroup({
    e11: new FormControl('1'), e12: new FormControl('0'), e13: new FormControl('0'),
    e21: new FormControl('0'), e22: new FormControl('1'), e23: new FormControl('0'),
    e31: new FormControl('0'), e32: new FormControl('0'), e33: new FormControl('1'),
  });
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(inputs => {
      let q = [[inputs.e11, inputs.e12, inputs.e13],
               [inputs.e21, inputs.e22, inputs.e23],
               [inputs.e31, inputs.e32, inputs.e33],]
      let w = q.map(xs=>xs.map(x=>parseFloat(x) || 0))
      this.store.dispatch(matrixAction({matrix: w}))
    })
  }

  ngAfterViewInit(): void {
    this.cellChildren.forEach(cell=>{
      cell.wheelin.subscribe((x:CellWheelInfo)=>{
        let key = `e${x.row}${x.col}`
        let val = Number(this.formGroup.controls[key].value) + x.deltaY * 0.01
        this.formGroup.patchValue({
          [key]: val.toFixed(2)
        })
      })
    })
  }

  shapeChanged(shape:MatRadioChange): void {
    let sh = this.shapes[shape.value].shape
    this.store.dispatch(chooseShapeAction({shape: sh}))
  }
}

class ShapeData {
  constructor(
    public name: string,
    public shape: Shape,
    public checked: boolean
  ) { }
}