import bcrypt from 'bcrypt';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './students.interface';

import { Schema, model } from 'mongoose';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const checkFirstName = value.charAt(0).toUpperCase() + value.slice(1);
    //     return checkFirstName === value;
    //   },
    //   message: '{VALUE} is not capitalize formet',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloogGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddres: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuradianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status',
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// studentSchema.post('save', function (doc, next) {
//   // Set the password field to undefined
//   doc.set('password', undefined);

//   next();
// });

studentSchema.set('toJSON', {
  transform: function (doc, upDate) {
    delete upDate.password;
    return upDate;
  },
});

// studentSchema.post('findOne', function (doc, next) {
//   // Set the password field to undefined
//   doc.set('password', undefined);

//   next();
// });

// studentSchema.post('find', function (docs, next) {
//   // Modify each document in the array to exclude the password field
//   docs.forEach((doc: { set: (arg0: string, arg1: undefined) => void }) => {
//     doc.set('password', undefined);
//   });

//   next();
// });

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// studentSchema.post('find', function (docs, next) {
//   const filteredFields = docs.map((doc: TStudent) => ({
//     name: doc.name,
//     email: doc.email,
//     contactNo: doc.contactNo,
//     presentAddress: doc.presentAddress,
//     // Add other necessary fields here
//   }));

//   // Replace the original documents with the filtered ones
//   docs.length = 0;
//   Array.prototype.push.apply(docs, filteredFields);

//   next();
// });

//creating a custom Static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

//creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
