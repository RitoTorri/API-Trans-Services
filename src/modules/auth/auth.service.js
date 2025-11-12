import AuthModel from './auth.model.js';
import Token from '../../shared/utils/token.access.js';
import bcrypt from 'bcrypt';

const model = new AuthModel();

class AuthService {
  async login(object) {
    try {
      console.log('🟡 Intentando login con:', object);

      const result = await model.login(object);
      console.log('🟢 Usuario encontrado:', result);

      if (!result) {
        throw {
          code: 'ITEM_NOT_FOUND',
          message: 'The item was not found.',
          details: 'Usuario no encontrado o inactivo.'
        };
      }

<<<<<<< Updated upstream
            // Generar el token
            const token = await Token.genToken(result)
            return token
        } catch (error) { throw error }
=======
      const validationPassword = await bcrypt.compare(object.password, result.password);
      console.log('🔍 ¿Contraseña válida?', validationPassword);

      if (!validationPassword) {
        throw {
          code: 'ITEM_NOT_FOUND',
          message: 'The item was not found.',
          details: 'Password incorrect or username not exist.'
        };
      }

      const token = await Token.genToken(result);
      console.log('✅ Token generado:', token);

      return { token, user: result };

    } catch (error) {
      console.error('❌ Error en login:', error);
      throw {
        code: 'ERROR_INTERNAL',
        message: 'Internal error.',
        details: error.message || 'Error Internal Server'
      };
>>>>>>> Stashed changes
    }
  }
}

export default AuthService;
