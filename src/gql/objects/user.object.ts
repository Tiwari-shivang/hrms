import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserObject{
    @Field(() => ID)
    id: string;
    @Field()
    first_name: string;
    @Field()
    last_name: string;
    @Field()
    email: string;
    @Field(() => Date)
    created_at: Date
    @Field(() => Date)
    updated_at: Date
}