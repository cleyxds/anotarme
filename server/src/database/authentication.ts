// io.use((socket, next) => {
//   // Implemente a lógica de autenticação aqui
//   const token = socket.handshake.auth.token;

//   // Verifique o token (isso é apenas um exemplo, ajuste conforme sua autenticação)
//   if (tokenValido(token)) {
//     return next();
//   } else {
//     return next(new Error("Autenticação falhou"));
//   }
// });
