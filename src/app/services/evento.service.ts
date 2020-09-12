import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{AngularFireStorage} from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})

export class EventoService {

private eventoCollection:AngularFirestoreCollection<any>;
eventos: Observable<any[]>;

  constructor( private readonly afs:AngularFirestore, private afStorage: AngularFireStorage) {

    this.eventoCollection = afs.collection<any>('events');
    this.eventos = this.eventoCollection.snapshotChanges().pipe(map(
     actions => actions.map(a =>{
       const data = a.payload.doc.data()as any;
       const id = a.payload.doc.id;
       return{id, ...data};
     }) 
    ));
   }

  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    imageURL: new FormControl('')

  })

  getEvento(){
  return this.eventos;
  }

  uploadImage() {

  }

  updateEvento(evento:any){
   return  this.eventoCollection.doc(evento.id).update(evento);
  }
  deleteEvento(id:string){
  return this.eventoCollection.doc(id).delete();
  }
  createEvento(evento:any){

    return this.eventoCollection.add(evento);

  }
}
