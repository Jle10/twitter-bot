const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout para enviar el mensaje 5 minutos despues del follow

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Iniciado el proceso de envio automatico de Mensajes Directos 🚀🚀🚀");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  console.log("Trying to send message");
  const { screen_name, name } = user.source;
  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  console.log("El user.source es : " + user.source);
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 NUEVO Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/events/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Mensaje enviado correctamente a ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hola ${name} muchísimas gracias por el follow!! No quiero molestarte mucho más, soy cantante y estoy intentando crecer en el mundillo jejeje estoy creando una web (https://andreaborras.com) para ver si así avanzo más rápido
  si pudieras echarle un vistazo sería genial! Y sobretodo si pudieras avisarme si ves algo mal o raro también sería fastantico así lo arreglo!! \n Muchas gracias de nuevo, un abrazo <3<3 \n 😊😊 `; // your message
};

module.exports = AutoDM;
