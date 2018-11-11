import { Component, OnInit } from "@angular/core";
import { IouService } from "./iou.service";
import { AuthService } from "../auth/auth.service";
@Component({
  selector: "app-iou",
  templateUrl: "./iou.component.html",
  styleUrls: ["./iou.component.css"]
})
export class IouComponent implements OnInit {
  public items;
  public title;
  public pcs;
  public price;
  public editItem = {
    title: null,
    price: null,
    pcs: null
  };

  constructor(public iouService: IouService, public authService: AuthService) {
    // console.log(this.items);
  }

  ngOnInit() {
    console.log(this.authService.user);
  }

  add() {
    // console.log("toto")
    this.iouService.createItem({
      title: this.title,
      pcs: this.pcs,
      price: this.price,
      uid: this.authService.user.uid
    });
  }
  delete(key: string) {
    this.iouService.deleteItem(key);
  }
  edit(item: any) {
    this.editItem = item;
  }
  update() {
    this.iouService.updateItem(this.editItem.key, this.editItem);
  }
}
