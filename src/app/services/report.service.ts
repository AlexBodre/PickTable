import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Report } from '../model/Report';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private afs: AngularFirestore) { }

  changeStatus(id: string, newStatus: string): Promise<void> {
    return this.afs.collection<Report>('reports').doc(id).update({"status": newStatus});
  }

  getAllReports(): Observable<Report[]> {
    return this.afs.collection<Report>('reports').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(r => {
          const data = r.payload.doc.data() as Report;
          const id = r.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }

  getReportsByType(type: string): Observable<Report[]> {
    return this.afs.collection<Report>('reports', ref => ref.where('report_type', '==', type)).snapshotChanges()
    .pipe(
      map(reports => {
        return reports.map(r => {
          const data = r.payload.doc.data() as Report;
          const id = r.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }

  getReportByProvince(provincia: string):Observable<Report[]>{
    return this.afs.collection<Report>('reports',ref => ref.where('provincia','==', provincia)).snapshotChanges() .pipe(
      map(reports => {
        return reports.map(r => {
          const data = r.payload.doc.data() as Report;
          const id = r.payload.doc.id;
          return {id, ...data};
        })
      })
    );
  }

  getReportByMunicipio(muni: string):Observable<Report[]>{
    return this.afs.collection<Report>('reports',ref => ref.where('municipio','==', muni)).snapshotChanges() .pipe(
      map(reports => {
        return reports.map(r => {
          const data = r.payload.doc.data() as Report;
          const id = r.payload.doc.id;
          return {id, ...data};
        })
      })
    );
  }

 getReporteByDateRange(date: any, date2: any):Observable<Report[]>{
   const desde = Date.parse(date);
   const hasta = Date.parse(date2);
   return this.afs.collection<Report>('reports', ref => ref.where('timestamp','>=',desde).where('timestamp', '<=', hasta)).snapshotChanges()
   .pipe(
    map(reports => {
      return reports.map(r => {
        const data = r.payload.doc.data() as Report;
        const id = r.payload.doc.id;
        return {id, ...data};
      })
    })
  );
 }

 getReporteByDate(date: any):Observable<Report[]>{
   const desde = Date.parse(date);
   const hasta = Date.parse(date);
   return this.afs.collection<Report>('reports', ref => ref.where('date','>=',desde)).snapshotChanges()
   .pipe(
    map(reports => {
      return reports.map(r => {
        const data = r.payload.doc.data() as Report;
        const id = r.payload.doc.id;
        return {id, ...data};
      })
    })
  );
 }

  compare(a, b) {
    const timestampA = a.timestamp;
    const timestampB = b.timestamp;

    let comparison = 0;
    if (timestampA > timestampB) {
      comparison = 1;
    } else if (timestampA  < timestampB) {
      comparison = -1;
    }
    return comparison * -1;
  }
}
