import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Injectable()


export class PostService {

  private basePath: string = '/posts';
 
  public items: Observable<any[]>;
  posts:AngularFireList<any> = null; //  list of objects
  post: any = null; //   single object
  public itemsRef;
  constructor(private db: AngularFireDatabase) { 
    
  this.itemsRef= db.list(this.basePath);
  this.items = this.itemsRef.snapshotChanges().pipe(
map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  

  getPostsList(): any {
    this.posts = this.db.list(this.basePath);
    return this.posts;
  }

  getPost(key: string): any {
    const postPath =  `${this.basePath}/${key}`;
    this.post = this.db.object(postPath)
    return this.post
  }

  createPost(post: any): void  {
   this.posts.push(post)
     .catch(error => this.handleError(error))
 }


 // Update an existing post
 updatePost(key: string, value: any): void {
   this.posts.update(key, value)
     .catch(error => this.handleError(error))
 }

 // Deletes a single post
 deletePost(key: string): void {
     this.posts.remove(key)
       .catch(error => this.handleError(error))
 }

 // Deletes the entire list of posts
 deleteAll(): void {
     this.posts.remove()
       .catch(error => this.handleError(error))
 }

 // Default error handling for all actions
 private handleError(error) {
   console.log(error)
 }

}