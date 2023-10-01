import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop()
    username: string;

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: 'submitter', enum: ['submitter', 'moderator', 'analyst', 'administrator'] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
