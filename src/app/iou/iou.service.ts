import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class IouService {
  private basePath: string;
  public items: Observable<any[]>;
  public itemsList: AngularFireList<any> = null; //  list of objects
  public item: any = null; //   single object
  public itemsRef;
  public total = 0;
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.basePath = "/iou/0";
    authService.afAuth.user.subscribe(res => {
      if (res != null) {
        this.basePath = "/iou/" + res.uid;
      } else {
        this.basePath = "/iou/0";
      }
      this.itemsRef = db.list(this.basePath);
      this.getItemsList();
      this.getItems();
    });

    console.log("iouService instents created");
  }

  getItems() {
    if (this.itemsRef) {
      this.items = this.itemsRef
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      this.calcTotal();
    }
  }
  calcTotal() {
    this.items.subscribe(res => {
      this.total = 0;
      for (let item of res) {
        this.total = item.price * item.pcs + this.total;
      }
    });
  }

  getItemsList(): any {
    this.itemsList = this.db.list(this.basePath);
    return this.itemsList;
  }

  getItem(key: string): any {
    const itemPath = `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath);
    return this.item;
  }

  createItem(item: any): void {
    this.itemsList.push(item).catch(error => this.handleError(error));
  }

  // Update an existing post
  updateItem(key: string, value: any): void {
    this.itemsList.update(key, value).catch(error => this.handleError(error));
  }

  // Deletes a single post
  deleteItem(key: string): void {
    this.itemsList.remove(key).catch(error => this.handleError(error));
  }

  // Deletes the entire list of posts
  deleteAll(): void {
    this.itemsList.remove().catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
export class Data {
  static total;
}
