import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'classes' })
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true })
  name: string;
}
