// Sistema Militar R0VER.M - Script Principal

// =================== 
// EFECTOS VISUALES R0VER.M 
// =================== 

// Función para crear partículas del cursor
function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 2 + 1;
    const lifetime = Math.random() * 1000 + 500;
    
    document.body.appendChild(particle);
    
    let opacity = 1;
    const animate = () => {
        if (opacity <= 0) {
            particle.remove();
            return;
        }
        
        opacity -= 0.02;
        particle.style.opacity = opacity;
        particle.style.transform = `translate(
            ${Math.cos(angle) * velocity * (1 - opacity) * 20}px,
            ${Math.sin(angle) * velocity * (1 - opacity) * 20}px
        )`;
        
        requestAnimationFrame(animate);
    };
    
    animate();
    setTimeout(() => particle.remove(), lifetime);
}

// Función para cargar URLs
function loadUrl(url) {
    const homePage = document.getElementById('homePage');
    const pagContent = document.getElementById('pagContent');
    const mainFrame = document.getElementById('mainFrame');
    const chatWindow = document.getElementById('chatWindow');

    if (url === 'index.html') {
        window.location.href = 'index.html';
        return;
    }

    homePage.style.display = 'none';
    pagContent.style.display = 'block';
    chatWindow.style.display = 'none';
    mainFrame.src = url;

    const pageTitle = url.replace('.html', '').charAt(0).toUpperCase() + url.replace('.html', '').slice(1);
    document.title = `R0VER.M - ${pageTitle}`;
}

// Función para abrir el chat

// Función para enviar mensajes en el chat
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (messageInput.value.trim() !== '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = messageInput.value;
        chatMessages.appendChild(messageDiv);
        messageInput.value = '';
        
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message system';
            responseDiv.textContent = 'Mensaje recibido. Un agente se pondrá en contacto pronto.';
            chatMessages.appendChild(responseDiv);
            
            // Crear partículas para el mensaje
            for (let i = 0; i < 5; i++) {
                createCursorParticle(
                    responseDiv.offsetLeft + Math.random() * responseDiv.offsetWidth,
                    responseDiv.offsetTop + Math.random() * responseDiv.offsetHeight
                );
            }
        }, 1000);
    }
}

// Función mejorada para la explosión del robot
function explode() { 
    const explosion = document.querySelector('.explosion'); 
    const heroSection = document.querySelector('.hero-section'); 
    
    if (!explosion || !heroSection) {
        // Fallback a la versión anterior si no se encuentran los elementos
        const robot = document.querySelector('.pixel-robot');
        if (robot) {
            const rect = robot.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            robot.style.display = 'none';
            
            // Crear partículas de explosión
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'explosion-particle';
                
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                
                const angle = (Math.PI * 2 * i) / 20;
                const distance = Math.random() * 100 + 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 800);
            }
            
            setTimeout(() => {
                robot.style.display = 'block';
            }, 1000);
        }
        return;
    }
    
    explosion.style.display = 'block'; 
     
    const maxTop = heroSection.offsetHeight - 100; 
    const maxLeft = heroSection.offsetWidth - 100; 
     
    explosion.style.top = (Math.random() * maxTop) + 'px'; 
    explosion.style.left = (Math.random() * maxLeft) + 'px'; 
     
    // Add explosion sound 
    const sound = new Audio('data:audio/mp3;base64,SUQzAwAAAAACGVRBTEIAAAABAAAAVENPTiBUUkFYAAAABgAAAFRQRTEAAAANAAAAU29mdHdhcmVYWVoAAA=='); 
    sound.volume = 0.3; 
    sound.play().catch(e => console.log('Audio play prevented: ', e)); 
     
    // Create explosion particles 
    createExplosionParticles(explosion.offsetLeft, explosion.offsetTop); 
     
    setTimeout(() => { 
        explosion.style.display = 'none'; 
    }, 800); 
     
    // Add to history 
    addToStatusLog('¡Alerta! Explosión detectada'); 
}
// Sistema de notificaciones
function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Crear partículas para la notificación
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createCursorParticle(
                notification.offsetLeft + Math.random() * notification.offsetWidth,
                notification.offsetTop + Math.random() * notification.offsetHeight
            );
        }, i * 200);
    }
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Cursor personalizado con partículas
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        if (Math.random() < 0.1) {
            createCursorParticle(e.clientX, e.clientY);
        }
    }
});

// Evento de clic para efectos adicionales
document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
        createCursorParticle(e.clientX, e.clientY);
    }
});

// Inicialización del sistema
document.addEventListener('DOMContentLoaded', () => {
    // Crear cursor personalizado si no existe
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
    }

    // Efectos al pasar por elementos interactivos
    const interactiveElements = document.querySelectorAll('button, a, .button, .sidebar-item, .win95-close-button');
    const cursor = document.querySelector('.custom-cursor');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
            cursor.style.mixBlendMode = 'difference';
            
            // Crear partículas al pasar sobre elementos interactivos
            for (let i = 0; i < 3; i++) {
                createCursorParticle(
                    element.offsetLeft + Math.random() * element.offsetWidth,
                    element.offsetTop + Math.random() * element.offsetHeight
                );
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
            cursor.style.mixBlendMode = 'difference';
        });
    });

    updateMilitaryTime();
    setInterval(updateMilitaryTime, 1000);

    setTimeout(() => {
        createNotification('Sistema R0VER.M inicializado correctamente', 'success');
    }, 2000);
    
    // Agregar evento para crear explosiones de partículas coloridas al hacer doble clic
    document.addEventListener('dblclick', (e) => {
        createExplosionParticles(e.clientX, e.clientY);
    });
    
    // Agregar efecto de explosión a los elementos del logo
    const logoElements = document.querySelectorAll('.logo-container, .footer-logo');
    logoElements.forEach(element => {
        element.addEventListener('click', function() {
            const rect = this.getBoundingClientRect();
            createExplosionParticles(rect.left + rect.width/2, rect.top + rect.height/2);
        });
    });
});

// Actualizar hora militar
function updateMilitaryTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const militaryTime = `${hours}:${minutes}:${seconds}`;
    const statusItems = document.querySelectorAll('.status-item');
    if (statusItems.length > 1) {
        statusItems[1].textContent = `HORA: ${militaryTime}`;
    }
}

// Menú móvil
function toggleMobileMenu() {
    const mobileNav = document.querySelector('nav ul');
    mobileNav.classList.toggle('show-mobile-menu');
}

// Función para crear explosión de partículas coloridas
function createExplosionParticles(x, y) { 
    const particleCount = 20; 
    const heroSection = document.querySelector('.hero-section') || document.body; 
    
    for (let i = 0; i < particleCount; i++) { 
        const particle = document.createElement('div'); 
        particle.className = 'explosion-particle-color'; 
        particle.style.left = x + 'px'; 
        particle.style.top = y + 'px'; 
        
        // Dirección aleatoria
        const angle = Math.random() * Math.PI * 2; 
        const speed = 2 + Math.random() * 5; 
        const size = 5 + Math.random() * 15; 
        
        particle.style.width = size + 'px'; 
        particle.style.height = size + 'px'; 
        particle.style.backgroundColor = getRandomColor(); 
        
        heroSection.appendChild(particle); 
        
        // Animar partícula
        let posX = x; 
        let posY = y; 
        let frame = 0; 
        const maxFrames = 50; 
        
        const animate = () => { 
            posX += Math.cos(angle) * speed; 
            posY += Math.sin(angle) * speed; 
            
            particle.style.left = posX + 'px'; 
            particle.style.top = posY + 'px'; 
            particle.style.opacity = 1 - (frame / maxFrames); 
            
            frame++; 
            
            if (frame < maxFrames) { 
                requestAnimationFrame(animate); 
            } else { 
                heroSection.removeChild(particle); 
            } 
        }; 
        
        requestAnimationFrame(animate); 
    } 
} 

// Función para obtener colores aleatorios para las partículas
function getRandomColor() { 
    const colors = ['#ff0000', '#ff7700', '#ffff00', '#ff5500', '#ff9900']; 
    return colors[Math.floor(Math.random() * colors.length)]; 
}
function openCustomerSupport() {
    const supportPanel = document.getElementById('customerSupportPanel');
    const supportFrame = document.getElementById('supportFrame');
    
    if (!supportPanel || !supportFrame) return;
    
    // Cargar la página de servicio al cliente en el iframe
    supportFrame.src = 'servicioalcliente.html';
    
    // Mostrar el panel
    supportPanel.style.display = 'flex';
    supportPanel.classList.remove('minimized');
    
    // Efectos visuales
    createExplosionParticles(
        document.getElementById('chatButton').offsetLeft,
        document.getElementById('chatButton').offsetTop
    );
    
    // Registrar en el log si existe la función
    if (typeof addToStatusLog === 'function') {
        addToStatusLog('Panel de servicio al cliente activado');
    }
}

function closeCustomerSupport() {
    const supportPanel = document.getElementById('customerSupportPanel');
    if (!supportPanel) return;
    
    supportPanel.style.display = 'none';
    
    // Registrar en el log si existe la función
    if (typeof addToStatusLog === 'function') {
        addToStatusLog('Panel de servicio al cliente cerrado');
    }
}

function minimizeCustomerSupport() {
    const supportPanel = document.getElementById('customerSupportPanel');
    if (!supportPanel) return;
    
    supportPanel.classList.toggle('minimized');
    
    // Registrar en el log si existe la función
    if (typeof addToStatusLog === 'function') {
        addToStatusLog('Panel de servicio al cliente minimizado');
    }
}