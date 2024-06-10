// // mongoose-findorcreate.d.ts
// declare module 'mongoose-findorcreate' {
//     import mongoose = require('mongoose');
  
//     interface FindOrCreateResult<T> {
//       doc: T;
//       created: boolean;
//     }
  
//     interface FindOrCreate<T> {
//       (condition: any, doc: T): Promise<FindOrCreateResult<T>>;
//     }
  
//     function findOrCreate(schema: mongoose.Schema): void;
  
//     namespace findOrCreate {}
  
//     export = findOrCreate;
//   }
  