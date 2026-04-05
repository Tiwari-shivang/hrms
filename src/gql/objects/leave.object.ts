import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LeaveObject{
    @Field(() => ID)
    id: string;
    
}