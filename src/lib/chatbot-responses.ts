/**
 * Sistema de respuestas inteligente para el chatbot
 * Responde preguntas sobre el sistema electoral y el usuario
 */

interface ResponsePattern {
  keywords: string[];
  response: string;
  priority: number; // Mayor prioridad = se evalúa primero
}

const responsePatterns: ResponsePattern[] = [
  // Saludos
  {
    keywords: ["hola", "hi", "buenos días", "buenas tardes", "buenas noches", "saludos"],
    response: "¡Hola! 👋 Estoy aquí para ayudarte con cualquier duda sobre el Sistema Electoral Perú 2025. ¿En qué puedo asistirte?",
    priority: 10,
  },
  {
    keywords: ["gracias", "thank you", "muchas gracias"],
    response: "¡De nada! 😊 Si tienes más preguntas sobre el sistema electoral, no dudes en preguntarme.",
    priority: 10,
  },

  // Cómo iniciar / Cómo empezar
  {
    keywords: [
      "cómo inicio", "como inicio", "cómo empiezo", "como empiezo", 
      "cómo comienzo", "como comienzo", "cómo empiezo a votar", "como empiezo a votar",
      "cómo inicio sesión", "como inicio sesion", "cómo inicio sesion", "como inicio sesión",
      "iniciar sesión", "iniciar sesion", "inicio sesión", "inicio sesion",
      "cómo me registro", "como me registro", "cómo registrarme", "como registrarme",
      "cómo empezar", "como empezar", "cómo comenzar", "como comenzar",
      "quiero votar", "deseo votar", "necesito votar", "puedo votar"
    ],
    response: "Para iniciar el proceso de votación:\n\n1. Ingresa tu DNI de 8 dígitos en la pantalla principal\n2. El sistema verificará tu identidad con RENIEC\n3. Una vez verificado, serás redirigido a la página de votación\n4. Selecciona tus candidatos y confirma tu voto\n\n¡Es muy sencillo! Solo necesitas tu DNI.",
    priority: 9,
  },
  {
    keywords: ["qué necesito", "requisitos", "qué documento necesito", "qué debo tener"],
    response: "Para votar solo necesitas:\n\n✅ Tu DNI (Documento Nacional de Identidad) de 8 dígitos\n✅ Estar registrado en RENIEC\n\nNo necesitas crear una cuenta ni registrarte previamente. El sistema verifica tu identidad automáticamente.",
    priority: 9,
  },

  // Sobre el DNI
  {
    keywords: ["dni", "documento", "número de dni", "qué es el dni"],
    response: "El DNI (Documento Nacional de Identidad) es tu documento de identificación peruano. Debe tener exactamente 8 dígitos numéricos. El sistema lo usa para verificar tu identidad con RENIEC antes de permitirte votar.",
    priority: 8,
  },
  {
    keywords: ["dni incorrecto", "dni inválido", "dni no funciona", "error dni", "dni no encontrado"],
    response: "Si tu DNI no es reconocido:\n\n• Verifica que tengas exactamente 8 dígitos\n• Asegúrate de que tu DNI esté registrado en RENIEC\n• Si el problema persiste, contacta con el administrador del sistema\n\nEl DNI debe ser válido y estar activo en el registro nacional.",
    priority: 8,
  },

  // Sobre la votación
  {
    keywords: ["cómo voto", "proceso de votación", "pasos para votar", "instrucciones para votar"],
    response: "El proceso de votación es simple:\n\n1️⃣ Ingresa tu DNI en la página principal\n2️⃣ Espera la verificación de identidad\n3️⃣ Selecciona tus candidatos en cada categoría:\n   • Presidencial\n   • Distrital\n   • Regional\n4️⃣ Revisa tu selección\n5️⃣ Confirma tu voto\n\n¡Tu voto es secreto y seguro!",
    priority: 9,
  },
  {
    keywords: ["puedo cambiar", "modificar voto", "corregir voto", "cambiar mi voto"],
    response: "Una vez que confirmas tu voto, no puedes modificarlo. Por eso es importante revisar bien tus selecciones antes de confirmar. Asegúrate de elegir a los candidatos que realmente deseas antes de finalizar.",
    priority: 7,
  },
  {
    keywords: ["ya voté", "puedo votar otra vez", "votar dos veces", "votar de nuevo"],
    response: "No, cada persona solo puede votar una vez. El sistema registra tu DNI cuando votas para evitar votos duplicados. Esto garantiza la integridad del proceso electoral.",
    priority: 7,
  },

  // Sobre candidatos
  {
    keywords: ["candidatos", "quiénes son los candidatos", "ver candidatos", "lista de candidatos"],
    response: "En el sistema puedes votar por candidatos en tres categorías:\n\n🏛️ **Presidencial**: Candidatos a la presidencia\n🏛️ **Distrital**: Candidatos de tu distrito\n🏛️ **Regional**: Candidatos de tu región\n\nUna vez que ingreses al sistema de votación, verás todas las opciones disponibles para cada categoría.",
    priority: 8,
  },

  // Problemas técnicos
  {
    keywords: ["error", "no funciona", "problema", "falla", "bug", "no carga"],
    response: "Si experimentas problemas técnicos:\n\n• Recarga la página (F5 o Ctrl+R)\n• Verifica tu conexión a internet\n• Asegúrate de usar un navegador actualizado (Chrome, Firefox, Edge)\n• Si el problema persiste, contacta al soporte técnico\n\nEl sistema está optimizado para funcionar en la mayoría de navegadores modernos.",
    priority: 6,
  },
  {
    keywords: ["lento", "tarda mucho", "demora", "carga lento"],
    response: "Si el sistema está lento:\n\n• Verifica tu conexión a internet\n• Cierra otras pestañas o aplicaciones que consuman recursos\n• Espera unos segundos, la verificación con RENIEC puede tomar un momento\n• Si persiste, intenta recargar la página",
    priority: 6,
  },

  // Seguridad
  {
    keywords: ["seguro", "seguridad", "privacidad", "mis datos", "confidencial"],
    response: "Tu seguridad y privacidad son importantes:\n\n🔒 Tu voto es completamente secreto y anónimo\n🔒 Tus datos personales están protegidos\n🔒 El sistema usa verificación con RENIEC para garantizar identidad\n🔒 No se almacena información que pueda identificar tu voto\n\nEl sistema cumple con los más altos estándares de seguridad electoral.",
    priority: 7,
  },

  // Información general
  {
    keywords: ["qué es", "qué es este sistema", "sistema electoral", "elecciones"],
    response: "Este es el Sistema Electoral Perú 2025, una plataforma digital moderna y segura para gestionar el proceso de votación electoral. Permite a los ciudadanos peruanos ejercer su derecho al voto de forma digital, verificando su identidad mediante RENIEC y garantizando la transparencia y seguridad del proceso.",
    priority: 8,
  },
  {
    keywords: ["ayuda", "help", "soporte", "asistencia"],
    response: "Estoy aquí para ayudarte. Puedes preguntarme sobre:\n\n• Cómo iniciar el proceso de votación\n• Requisitos para votar\n• Cómo funciona el sistema\n• Problemas técnicos\n• Seguridad y privacidad\n\n¿Qué te gustaría saber?",
    priority: 9,
  },
];

/**
 * Normaliza el texto removiendo acentos y caracteres especiales
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .trim();
}

/**
 * Busca la mejor respuesta basada en las palabras clave
 */
export function getChatbotResponse(userMessage: string): string {
  const normalizedMessage = normalizeText(userMessage);

  // Respuesta por defecto para temas no relacionados
  const defaultResponse = "Lo siento, no entiendo esa pregunta. 😅 Solo puedo ayudarte con dudas relacionadas al Sistema Electoral Perú 2025, como:\n\n• Cómo iniciar el proceso de votación\n• Requisitos para votar\n• Cómo funciona el sistema\n• Problemas técnicos\n\n¿Hay algo específico sobre el sistema electoral que te gustaría saber?";

  // Verificar si la pregunta es sobre temas no relacionados
  const unrelatedTopics = [
    "goku", "dragon ball", "anime", "película", "pelicula", "fútbol", "futbol", 
    "deporte", "música", "musica", "canción", "cancion", "juego", "videojuego",
    "comida", "receta", "cocinar", "clima", "tiempo", "noticia", "política general",
    "historia", "geografía", "matemática", "ciencia", "tecnología general"
  ];

  const isUnrelated = unrelatedTopics.some(topic => 
    normalizedMessage.includes(topic)
  );

  if (isUnrelated) {
    return defaultResponse;
  }

  // Ordenar patrones por prioridad (mayor primero)
  const sortedPatterns = [...responsePatterns].sort((a, b) => b.priority - a.priority);

  // Buscar el patrón que mejor coincida
  for (const pattern of sortedPatterns) {
    const matches = pattern.keywords.filter(keyword => {
      const normalizedKeyword = normalizeText(keyword);
      return normalizedMessage.includes(normalizedKeyword) || 
             normalizedMessage.split(/\s+/).some(word => normalizedKeyword.includes(word));
    });
    
    if (matches.length > 0) {
      return pattern.response;
    }
  }

  // Búsqueda más flexible: buscar palabras clave individuales
  const words = normalizedMessage.split(/\s+/);
  for (const pattern of sortedPatterns) {
    for (const keyword of pattern.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      const keywordWords = normalizedKeyword.split(/\s+/);
      
      // Verificar si todas las palabras importantes del keyword están en el mensaje
      const importantWords = keywordWords.filter(w => w.length > 2);
      if (importantWords.length > 0) {
        const allWordsMatch = importantWords.every(kw => 
          words.some(w => w.includes(kw) || kw.includes(w))
        );
        
        if (allWordsMatch) {
          return pattern.response;
        }
      }
      
      // También verificar coincidencia directa
      if (normalizedMessage.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedMessage)) {
        return pattern.response;
      }
    }
  }

  // Si no se encuentra ninguna coincidencia, dar respuesta genérica pero útil
  if (normalizedMessage.length < 3) {
    return "Por favor, escribe una pregunta más completa para poder ayudarte mejor. 😊";
  }

  return defaultResponse;
}

