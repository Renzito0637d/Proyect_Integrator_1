import React, { useState, useRef, useEffect } from "react";

const preguntas = [
  "¿Cuál es tu nombre completo?",
  "¿Cuál es tu número de DNI o código de estudiante?",
  "¿A qué sede de la UCV perteneces? (Ej. Lima Norte, Trujillo, etc.)",
  "¿Cuál es tu correo institucional?",
  "¿Cuál es tu número de celular?",
  "¿Eres estudiante, docente, administrativo o egresado?",
  "¿A qué facultad o escuela profesional perteneces?",
  "¿Cuál es tu ciclo actual o último ciclo cursado?",
  "¿Qué tipo de incidencia deseas reportar?\n1) Problemas con matrícula\n2) Plataforma UCV Online\n3) Problemas con pagos\n4) Infraestructura (aula, laboratorio, etc.)\n5) Docente o administrativo\n6) Otro (especificar)",
  "¿Puedes describir brevemente el problema?",
  "¿Cuándo ocurrió la incidencia? (Fecha y hora aproximada)",
  "¿En qué lugar ocurrió? (Aula, laboratorio, oficina, plataforma virtual, etc.)",
  "¿Tienes algún número de referencia o código relacionado (ej. ticket, código de curso, etc.)?",
  // "¿Deseas adjuntar algún archivo o captura de pantalla como evidencia? (sí/no)", // Eliminada
  "¿Hay testigos del hecho? ¿Puedes proporcionar sus nombres o datos?",
  "¿Has reportado esta incidencia anteriormente? (sí/no)",
  "¿A quién se lo reportaste y cuál fue la respuesta?",
  "¿Deseas recibir seguimiento por correo, llamada o WhatsApp? (correo/llamada/WhatsApp)",
  "¿Confirmas que la información proporcionada es correcta? (sí/no)",
  "¿Deseas recibir una copia del reporte? (sí/no)"
];

const clavesReporte = [
  "nombreCompleto", "dniCodigo", "sede", "correo", "celular",
  "rol", "facultad", "ciclo", "tipoIncidencia", "descripcion",
  "fechaHora", "lugar", "codigoReferencia",
  // "adjuntarEvidencia", // Eliminada
  "testigos", "reportadoAntes", "respuestaReportado",
  "preferenciaSeguimiento", "confirmaInfo", "copiaReporte"
];

const tiposIncidenciaMap = {
  "1": "Problemas con matrícula",
  "2": "Plataforma UCV Online",
  "3": "Problemas con pagos",
  "4": "Infraestructura (aula, laboratorio, etc.)",
  "5": "Docente o administrativo",
  "6": "Otro"
};

export default function ChatbotUCV() {
  const [paso, setPaso] = useState(0);
  const [reporte, setReporte] = useState({});
  const [mensajeError, setMensajeError] = useState("");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{ sender: "bot", text: preguntas[0] }]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const validarCorreo = email => /\S+@\S+\.\S+/.test(email);

  function validarRespuesta(respuesta) {
    const r = respuesta.trim().toLowerCase();

    switch (paso) {
      case 1:
        if (!/^[0-9a-zA-Z\-]+$/.test(r)) return "Por favor ingresa un DNI o código válido.";
        break;
      case 2:
        if (r !== "lima norte") {
          return "Lo sentimos, este chatbot solo está disponible para la sede Lima Norte. No se puede hacer seguimiento para otras sedes.";
        }
        break;
      case 3:
        if (!validarCorreo(r)) return "Correo institucional inválido.";
        break;
      case 5:
        if (!["estudiante", "docente", "administrativo", "egresado"].includes(r)) {
          return 'Rol inválido. Escribe: estudiante, docente, administrativo o egresado.';
        }
        break;
      case 8:
        if (!["1", "2", "3", "4", "5", "6"].includes(r)) {
          return "Selecciona un número entre 1 y 6.";
        }
        break;
      case 14:  // antes era 15
      case 17:  // antes 18
        if (!["sí", "si", "no"].includes(r)) return 'Responde "sí" o "no".';
        break;
      default:
        if (r.length === 0) return "Este campo no puede estar vacío.";
    }

    return "";
  }

  function handleSend() {
    if (!input.trim()) return;
    const error = validarRespuesta(input);
    if (error) {
      setMensajeError(error);
      return;
    }
    setMensajeError("");

    const respuestaProcesada =
      paso === 8 ? tiposIncidenciaMap[input] :
      [14, 17].includes(paso) ? (input.toLowerCase().startsWith("s") ? "Sí" : "No") :
      input;

    const nuevoReporte = { ...reporte, [clavesReporte[paso]]: respuestaProcesada };

    setReporte(nuevoReporte);

    setChatLog(prev => [
      ...prev,
      { sender: "user", text: input },
      ...(paso + 1 < preguntas.length ? [{ sender: "bot", text: preguntas[paso + 1] }] : [])
    ]);

    setInput("");
    const siguientePaso = paso + 1;
    setPaso(siguientePaso);

    if (siguientePaso === preguntas.length) {
      if (respuestaProcesada.toLowerCase().startsWith("s")) {
        setTimeout(() => {
          const resumen = clavesReporte.map((key, idx) => {
            const label = preguntas[idx].split("\n")[0];
            return `${label}: ${nuevoReporte[key] || ''}`;
          }).join("\n");

          setChatLog(prev => [
            ...prev,
            {
              sender: "bot",
              text: `Este es el resumen de tu reporte:\n\n${resumen}\n\nGracias por tu reporte. En breve nos comunicaremos contigo.`
            }
          ]);
        }, 500);
      } else {
        setTimeout(() => {
          setChatLog(prev => [
            ...prev,
            { sender: "bot", text: "Reporte cancelado. Si deseas, puedes comenzar de nuevo." }
          ]);
          setPaso(0);
          setReporte({});
          setTimeout(() => setChatLog([{ sender: "bot", text: preguntas[0] }]), 1000);
        }, 500);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div style={{ maxWidth: 450, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Chatbot UCV - Reporte de Incidencias</h2>
      <div style={{
        border: "1px solid #ccc",
        borderRadius: 6,
        height: 500,
        padding: 15,
        overflowY: "auto",
        backgroundColor: "#fff"
      }}>
        {chatLog.map((msg, i) => (
          <p
            key={i}
            style={{
              color: msg.sender === "bot" ? "blue" : "green",
              textAlign: msg.sender === "bot" ? "left" : "right",
              whiteSpace: "pre-line",
              margin: "8px 0"
            }}
          >
            <strong>{msg.sender === "bot" ? "Bot:" : "Tú:"}</strong> {msg.text}
          </p>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ marginTop: 10, display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu respuesta aquí..."
          style={{ flex: 1, padding: 10, fontSize: "1em", borderRadius: 4, border: "1px solid #ccc" }}
          disabled={paso >= preguntas.length}
        />
        <button
          onClick={handleSend}
          style={{ marginLeft: 10, padding: "10px 20px", fontSize: "1em" }}
          disabled={paso >= preguntas.length}
        >
          Enviar
        </button>
      </div>

      {mensajeError && <p style={{ color: "red", marginTop: 5 }}>{mensajeError}</p>}
    </div>
  );
}
