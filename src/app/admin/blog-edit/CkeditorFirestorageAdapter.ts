import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

export class CkeditorFirestorageAdapter {

    task: AngularFireUploadTask;

    constructor(
        public loader: any,
        public storage: AngularFireStorage
    ) { }

    upload() {
        return new Promise((resolve, reject) => {
            this.loader.file.then(async (file) => {
                let path = `ckImages/${Date.now()}_${file.name}`;
                this.task = this.storage.upload(path, file);
                this.loader.uploaded = this.task.percentageChanges();
                this.loader.uploadTotal = 100;
                this.task.snapshotChanges().toPromise().then(async (e) => {
                    e.ref.getDownloadURL().then(async (url) => {
                        resolve({ default: url })
                    })
                });
            });
        });
    }

    abort() {
        this.task.cancel();
    }
}

export function ckeditorAdapterFactory(storageService: AngularFireStorage) {
    return function (editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CkeditorFirestorageAdapter(loader, storageService);
        }
    };
}