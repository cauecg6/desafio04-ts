import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve deletar um usuário existente pelo email', () => {
        const db: User[] = [{ name: 'nath', email: 'nath@test.com' }]
        const service = new UserService(db)
        const resultado = service.deleteUser('nath@test.com')
        expect(resultado).toBe(true)
        expect(db).toHaveLength(0)
    })

    it('Deve retornar false ao tentar deletar um usuário que não existe', () => {
        const db: User[] = [{ name: 'nath', email: 'nath@test.com' }]
        const service = new UserService(db)
        const resultado = service.deleteUser('naoexiste@test.com')
        expect(resultado).toBe(false)
        expect(db).toHaveLength(1)
    })
})
