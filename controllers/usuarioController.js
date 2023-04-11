import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"

export const crearUsuario = async (req, res) => {
  const { email } = req.body
  //--> Busca el email en la tabla
  const existeUsuario = await Usuario.findOne({ email })

  //--> Evitar registros duplicados
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado")
    return res.status(400).json({ msg: error.message })
  }

  //--> Crea registro y lo guardar
  try {
    //--> Crea un usuario apartir de lo que recibio
    const usuario = new Usuario(req.body)
    usuario.token = generarId()

    //--> Guardar registro en DB
    const usuarioAlmacenado = await usuario.save()

    //--> Muestra el usuario que se creo
    res.json(usuarioAlmacenado)

  } catch (error) { console.log(error) }
}

export const autenticar = async (req, res) => {
  const { email, password } = req.body

  //--> Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email })
  if (!usuario) {
    const error = new Error("El usuario no existe")
    return res.status(400).json({ msg: error.message })
  }
  if (!usuario.confirmado) {
    const error = new Error("El usuario no ha sido confirmado")
    return res.status(403).json({ msg: error.message })
  }
  //--> Comprobar si el usuario esta autenticado
  //--> Comprobar su password
}
