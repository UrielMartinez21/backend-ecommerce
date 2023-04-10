import mongoose from "mongoose";
import bcrypt from "bcrypt"

//--> Definir estructura de usuario
//--> Va a interactuar con la DB
//--> Creara una tabla con las columnas
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    token: {
      type: String
    },
    confirmado: {
      type: Boolean,
      default: false
    }
  }, {
  //--> 2 columnas; creado y actualizado
  timestamps: true,
}
)

//--> Se ejecuta antes de guardar el registro en la DB
usuarioSchema.pre('save', async function (next) {
  //--> Si no esta modificando la contraseña no se hara nada
  if (!this.isModified("password")) { next() }

  //--> N. de rondas
  const salt = await bcrypt.genSalt(10)

  //--> Aplicar has creado a contraseña recibida
  this.password = bcrypt.hash(this.password, salt)
})

//--> Crear modelo usuario / tabla usuario
const Usuario = mongoose.model("Usuario", usuarioSchema)

//--> Exportar modelo creado
export default Usuario