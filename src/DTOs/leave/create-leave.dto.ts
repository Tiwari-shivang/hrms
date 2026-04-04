import { Type } from "class-transformer"
import { IsDate, IsString } from "class-validator"

export class AddLeaveRequest{
    @IsString()
    user_id: string
    @IsDate()
    @Type(() => Date)
    from_date: Date
    @IsDate()
    @Type(() => Date)
    to_date: Date
    @IsString()
    reason: string
}