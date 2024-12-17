import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Asegúrate de importar la entidad
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Repositorio del usuario
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    const { mail, password, name } = createUserDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { mail } });
    if (existingUser) {
      throw new Error('El correo ya está en uso');
    }

    // Hashear la contraseña antes de guardarla
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = this.userRepository.create({
      mail,
      password,
      name,
    });

    return this.userRepository.save(newUser); // Guardar en la base de datos
  }

  // Buscar un usuario por su correo electrónico
  // En tu UsersService
  async findByEmail(mail: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mail } });
  }
  


  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Devuelve todos los usuarios
  }
  // Otros métodos (actualizar, eliminar, etc.) pueden ir aquí.
  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    // Actualizar las propiedades que vienen del DTO
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    await this.userRepository.remove(user);
  }

  async findByNameAndEmail(name: string, mail: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name, mail } });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { password: newPassword });
  }
}
