import { Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'


class Survey {
  @PrimaryColumn()
  readonly id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Survey }