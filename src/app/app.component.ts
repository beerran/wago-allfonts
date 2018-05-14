import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private ref: AngularFireStorageReference;
  private task: AngularFireUploadTask;
  private downloadUrl: any;
  private fileId: string;
  private newFont = '';

  constructor(private af: AngularFireStorage, private http: Http) { }

  processFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (e) => {
      const fileContents = reader.result;
      const newContents = this.replaceContents(fileContents);
    };
  }

  replaceContents(original: string) {
    let modified = original.replace('\n', '');
    const fonts = [
      'textFont',
      'timerFont',
      'stacksFont',
      'text1Font',
      'text2Font',
      'font'
    ];
    for (const font of fonts) {
      const r = new RegExp(`(\\["` + font + `"\\]) = (.*)`, 'gm');
      modified = modified.replace(r, `["` + font + `"] = "` + this.newFont + `",`);
    }

    this.sendFile(new Blob([modified], { type: 'application/x-www-form-urlencoded' }));
  }

  sendFile(file: Blob) {
    this.fileId = Math.random().toString(36).substring(2) + '.lua';
    this.ref = this.af.ref(this.fileId);
    this.task = this.ref.put(file);
    this.task.snapshotChanges().subscribe(s => {
      if (s.bytesTransferred === s.totalBytes) {
        setTimeout(() => {
          s.ref.getDownloadURL().then(val => {
            this.downloadUrl = val;
          });
        }, 1000);
      }
    });
  }
}
