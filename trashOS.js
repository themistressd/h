/**
 * TrashOS - Sistema operativo retro para Trashgènero
 * Autor: themistressd
 * Fecha: 2025-04-08
 * Versión: 1.1.0 "Fashion Killer Secta"
 */

class TrashOS {
    /**
     * Constructor del sistema TrashOS
     */
    constructor() {
        // Estado del sistema
        this.state = {
            isBooted: false,
            windows: [],
            activeWindow: null,
            desktopIcons: [],
            notifications: [],
            soundEnabled: true,
            user: null,
            // Estado específico de la secta
            isSectMember: false,
            userRank: null,
            userPoints: 0,
            userBadges: [],
            userMissions: [],
            userRituals: [],
            rituals: []
        };

        // Configuración
        this.config = {
            bootDuration: 3000,
            notificationDuration: 5000,
            maxWindows: 8,
            defaultWindowWidth: 800,
            defaultWindowHeight: 600,
            defaultWindowX: 50,
            defaultWindowY: 50
        };

        // Rutas a recursos
        this.assets = {
            icons: {
                blog: 'blog.png',
                browser: 'browser.png',
                error: 'error.png',
                file: 'file.png',
                folder: 'folder.png',
                gallery: 'gallery.png',
                help: 'help.png',
                image: 'image.png',
                info: 'info.png',
                mail: 'mail.png',
                manifesto: 'manifesto.png',
                mission: 'mission.png',
                music: 'music.png',
                new: 'new.png',
                notepad: 'notepad.png',
                open: 'open.png',
                ritual: 'ritual.png',
                save: 'save.png',
                settings: 'settings.png',
                shop: 'shop.png',
                trash: 'trash-icon.png',
                user: 'user.png',
                warning: 'warning.png',
                xxxFolder: 'xxx-folder.png'
            },
            cursors: {
                arrow: 'arrow.cur',
                hand: 'hand.cur', 
                text: 'text.cur',
                wait: 'wait.ani',
                resize: 'resize.cur',
                unavailable: 'unavailable.cur',
                ritual: 'ritual.cur'
            },
            sounds: {
                click: 'click.mp3',
                error: 'error.mp3',
                startup: 'startup.mp3',
                shutdown: 'shutdown.mp3',
                ritual: 'ritual.mp3'
            },
            images: {
                background: 'desktop-bg.jpg',
                background2: 'desktop-bg-2.jpg',
                background3: 'desktop-bg-3.jpg',
                logo: 'logo.png',
                glitchBanner: 'glitch-banner.jpg',
                manifesto: 'manifesto-bg.jpg',
                vhsTexture: 'vhs-texture.png'
            },
            easterEggs: [
                'easter1.gif',
                'easter2.gif',
                'easter3.gif'
            ]
        };

        // Inicialización
        this.init();
    }

    /**
     * Inicializar el sistema
     */
    init() {
        // Añadir escuchadores de eventos
        document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded.bind(this));
        window.addEventListener('load', this.onWindowLoad.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('error', this.onError.bind(this));

        // Inicializar gestor de ventanas
        this.windowManager = new WindowManager(this);

        // Cargar datos del usuario
        this.loadUserData();
        
        // Inicializar datos de la secta
        this.initSectData();
    }
    
    /**
     * Inicializar datos de la secta
     */
    initSectData() {
        // Verificar si el usuario ya es miembro
        const isMember = this.getUserData('isSectMember') || false;
        
        if (isMember) {
            this.state.isSectMember = true;
            this.state.userRank = this.getUserData('userRank') || 'Novicix Normativo';
            this.state.userPoints = this.getUserData('userPoints') || 0;
            this.state.userBadges = this.getUserData('userBadges') || [];
            this.state.userMissions = this.getUserData('userMissions') || [];
            this.state.userRituals = this.getUserData('userRituals') || [];
            
            // Cargar datos de rituales disponibles
            this.loadRitualsData();
        }
        
        // Registrar acciones de la secta
        this.registerSectActions();
    }
    
    /**
     * Cargar datos de rituales disponibles
     */
    loadRitualsData() {
        // En producción, estos datos vendrían del backend a través de AJAX
        // Para la demostración, usamos datos estáticos
        this.state.rituals = [
            {
                id: 'ritual1',
                title: 'Ritual de Iniciación Kitsch',
                date: '2025-05-15',
                time: '20:00',
                location: 'Club Underground Barcelona',
                description: 'Ritual de bienvenida para nuevos miembros. Dress code: Neón y plástico.',
                requiredRank: 'Novicix Normativo',
                capacity: 50,
                attendees: 23,
                points: 100,
                photos: ['ritual-1.jpg', 'ritual-2.jpg'],
                testimonies: [
                    { author: 'Miembro #45', text: 'Una experiencia transformadora que cambió mi visión de la moda.' },
                    { author: 'Miembro #12', text: 'El ritual me hizo cuestionar todas mis decisiones estéticas anteriores.' }
                ]
            },
            {
                id: 'ritual2',
                title: 'Ceremonia de Transgresión Estética',
                date: '2025-06-20',
                time: '22:00',
                location: 'Espacio Secreto Madrid',
                description: 'Ritual para romper los cánones estéticos hegemónicos. Traer prenda normativa para destruir.',
                requiredRank: 'Discípulx Kitsch',
                capacity: 30,
                attendees: 15,
                points: 250,
                photos: ['ritual-3.jpg'],
                testimonies: [
                    { author: 'Miembro #78', text: 'Nunca había sentido tanta liberación al destruir una prenda básica.' }
                ]
            },
            {
                id: 'ritual3',
                title: 'Consagración de Identidades Fluidas',
                date: '2025-07-10',
                time: '23:30',
                location: 'Ubicación revelada 24h antes',
                description: 'Ritual avanzado para miembros de alto rango. Experiencia inmersiva que desafía los límites de la identidad y la moda.',
                requiredRank: 'Obispx del Glitch',
                capacity: 15,
                attendees: 5,
                points: 500,
                photos: [],
                testimonies: []
            }
        ];
    }
    
    /**
     * Registrar acciones de la secta
     */
    registerSectActions() {
        // Registrar acciones específicas de la secta
        document.addEventListener('click', (e) => {
            // Botón para unirse a la secta
            if (e.target.matches('.join-sect-btn')) {
                this.joinSect();
            }
            
            // Botón para confirmar asistencia a ritual
            if (e.target.matches('.attend-ritual-btn')) {
                const ritualId = e.target.dataset.ritualId;
                this.attendRitual(ritualId);
            }
            
            // Botón para completar misión
            if (e.target.matches('.complete-mission-btn')) {
                const missionId = e.target.dataset.missionId;
                this.completeMission(missionId);
            }
            
            // Botón para usar insignia en perfil
            if (e.target.matches('.use-badge-btn')) {
                const badgeId = e.target.dataset.badgeId;
                this.setActiveBadge(badgeId);
            }
        });
    }

    /**
     * Evento: DOM cargado completamente
     */
    onDOMContentLoaded() {
        // Preparar elementos del DOM
        this.setupDOMElements();

        // Iniciar secuencia de arranque
        this.bootSequence();
    }

    /**
     * Configurar elementos del DOM
     */
    setupDOMElements() {
        // Elementos principales
        this.elements = {
            body: document.body,
            desktop: document.getElementById('trash-desktop'),
            startMenu: document.getElementById('trash-start-menu'),
            taskbar: document.getElementById('trash-taskbar'),
            clock: document.getElementById('trash-clock'),
            bootScreen: document.getElementById('trash-boot-screen'),
            notificationArea: document.getElementById('trash-notifications')
        };

        // Verificar que todos los elementos existen
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                console.error(`Elemento "${key}" no encontrado en el DOM`);
            }
        }
    }

    /**
     * Iniciar secuencia de arranque
     */
    bootSequence() {
        // Reproducir sonido de inicio
        this.playSound('startup');

        // Mostrar pantalla de arranque
        if (this.elements.bootScreen) {
            this.elements.bootScreen.style.display = 'flex';
        }

        // Simular carga
        setTimeout(() => {
            // Ocultar pantalla de arranque
            if (this.elements.bootScreen) {
                this.elements.bootScreen.style.display = 'none';
            }

            // Marcar como iniciado
            this.state.isBooted = true;

            // Cargar iconos del escritorio
            this.loadDesktopIcons();

            // Mostrar notificación de bienvenida
            this.showNotification('Bienvenidx a TrashOS', 'Sistema en línea', 'info');
            
            // Mostrar notificación de la secta si es miembro
            if (this.state.isSectMember) {
                setTimeout(() => {
                    this.showNotification('Secta Fashion Killer', `Bienvenidx de nuevo, ${this.state.userRank}`, 'ritual');
                }, 2000);
            }

            // Actualizar reloj
            this.updateClock();
            setInterval(this.updateClock.bind(this), 1000);
        }, this.config.bootDuration);
    }

    /**
     * Evento: Ventana cargada completamente
     */
    onWindowLoad() {
        // Inicializar sistemas adicionales cuando toda la página esté cargada
        console.log('TrashOS cargado completamente');
    }

    /**
     * Evento: Cambio de tamaño de ventana
     */
    onWindowResize() {
        // Ajustar elementos según el nuevo tamaño
        this.windowManager.repositionWindows();
    }

    /**
     * Evento: Tecla presionada
     * @param {KeyboardEvent} event - Evento de teclado
     */
    onKeyDown(event) {
        // Atajos de teclado
        if (event.ctrlKey && event.altKey && event.key === 'Delete') {
            this.showTaskManager();
        }
        
        // Easter egg: Konami Code
        // Implementar detector del código Konami
    }

    /**
     * Evento: Error JavaScript
     * @param {ErrorEvent} event - Evento de error
     */
    onError(event) {
        // Mostrar una pantalla azul de la muerte
        console.error('TrashOS Error:', event.message);
        this.showBlueScreen(event.message, event.filename, event.lineno);
    }

    /**
     * Cargar iconos del escritorio
     */
    loadDesktopIcons() {
        // Definir iconos
        const icons = [
            { id: 'browser', name: 'Internet', icon: 'browser', action: () => this.openBrowser() },
            { id: 'manifesto', name: 'Manifesto', icon: 'manifesto', action: () => this.openManifesto() },
            { id: 'shop', name: 'Shop', icon: 'shop', action: () => this.openShop() },
            { id: 'gallery', name: 'Gallery', icon: 'gallery', action: () => this.openGallery() },
            { id: 'blog', name: 'Blog', icon: 'blog', action: () => this.openBlog() }
        ];
        
        // Añadir icono de Secta Fashion Killer si es miembro o para unirse
        if (this.state.isSectMember) {
            icons.push({ 
                id: 'sect', 
                name: 'Secta Fashion Killer', 
                icon: 'ritual', 
                action: () => this.openSectDashboard() 
            });
        } else {
            icons.push({ 
                id: 'join-sect', 
                name: 'Unirse a la Secta', 
                icon: 'ritual', 
                action: () => this.openJoinSect() 
            });
        }
        
        // Añadir icono especial para contenido secreto si tiene rango alto
        if (this.isHighRankMember()) {
            icons.push({ 
                id: 'secret-content', 
                name: 'Contenido Secreto', 
                icon: 'xxxFolder', 
                action: () => this.openSecretContent() 
            });
        }

        // Crear los elementos en el DOM
        this.state.desktopIcons = icons;
        const desktopFragment = document.createDocumentFragment();

        icons.forEach(icon => {
            const iconElement = document.createElement('div');
            iconElement.className = 'desktop-icon';
            iconElement.id = `icon-${icon.id}`;
            iconElement.innerHTML = `
                <div class="icon-image">
                    <img src="${this.getAssetPath('icons/' + this.assets.icons[icon.icon])}" alt="${icon.name}">
                </div>
                <div class="icon-text">${icon.name}</div>
            `;
            iconElement.addEventListener('click', () => {
                this.playSound('click');
                icon.action();
            });
            desktopFragment.appendChild(iconElement);
        });

        if (this.elements.desktop) {
            this.elements.desktop.appendChild(desktopFragment);
        }
    }

    /**
     * Abrir una ventana
     * @param {Object} options - Opciones de la ventana
     */
    openWindow(options) {
        // Verificar si ya hay demasiadas ventanas abiertas
        if (this.state.windows.length >= this.config.maxWindows) {
            this.showNotification('Demasiadas ventanas', 'Cierra alguna ventana antes de abrir otra', 'warning');
            return null;
        }

        // Opciones por defecto
        const defaultOptions = {
            id: 'window-' + Date.now(),
            title: 'Nueva ventana',
            icon: 'file',
            content: '<p>Contenido de la ventana</p>',
            width: this.config.defaultWindowWidth,
            height: this.config.defaultWindowHeight,
            x: this.config.defaultWindowX + (this.state.windows.length * 20),
            y: this.config.defaultWindowY + (this.state.windows.length * 20),
            resizable: true,
            minimizable: true,
            maximizable: true,
            closable: true,
            modal: false,
            onClose: null,
            onMinimize: null,
            onMaximize: null,
            onRestore: null
        };

        // Fusionar opciones
        const windowOptions = { ...defaultOptions, ...options };

        // Crear la ventana
        const window = this.windowManager.createWindow(windowOptions);

        // Añadir a la lista de ventanas
        this.state.windows.push(window);

        // Activar la ventana
        this.windowManager.activateWindow(window.id);

        // Devolver la referencia a la ventana
        return window;
    }

    /**
     * Actualizar el reloj
     */
    updateClock() {
        if (this.elements.clock) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            this.elements.clock.textContent = `${hours}:${minutes}`;
        }
    }

    /**
     * Mostrar una notificación
     * @param {string} title - Título de la notificación
     * @param {string} message - Mensaje de la notificación
     * @param {string} type - Tipo de notificación (info, success, warning, error)
     */
    showNotification(title, message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `trash-notification notification-${type}`;
        
        // Determinar el icono basado en el tipo
        let iconName = 'info';
        if (type === 'error') iconName = 'error';
        if (type === 'warning') iconName = 'warning';
        if (type === 'success') iconName = 'info';
        if (type === 'ritual') iconName = 'ritual';
        
        notification.innerHTML = `
            <div class="notification-icon">
                <img src="${this.getAssetPath('icons/' + this.assets.icons[iconName])}" alt="${type}">
            </div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <div class="notification-close">&times;</div>
        `;

        // Añadir al área de notificaciones
        if (this.elements.notificationArea) {
            this.elements.notificationArea.appendChild(notification);
        }

        // Reproducir sonido de notificación
        if (type === 'error') {
            this.playSound('error');
        } else if (type === 'ritual') {
            this.playSound('ritual');
        } else {
            this.playSound('click');
        }

        // Añadir evento para cerrar
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.elements.notificationArea.removeChild(notification);
            });
        }

        // Auto-eliminar después de un tiempo
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('notification-fade-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        }, this.config.notificationDuration);

        // Añadir a la lista de notificaciones
        this.state.notifications.push({
            id: Date.now(),
            title,
            message,
            type,
            timestamp: new Date()
        });
    }

    /**
     * Mostrar pantalla azul de la muerte
     * @param {string} message - Mensaje de error
     * @param {string} file - Archivo donde ocurrió el error
     * @param {number} line - Línea donde ocurrió el error
     */
    showBlueScreen(message, file, line) {
        const blueScreen = document.createElement('div');
        blueScreen.className = 'trash-bluescreen';
        blueScreen.innerHTML = `
            <div class="bluescreen-content">
                <div class="bluescreen-title">TrashOS ha encontrado un error y necesita cerrarse</div>
                <div class="bluescreen-details">
                    <p>Error: ${message}</p>
                    <p>Archivo: ${file}</p>
                    <p>Línea: ${line}</p>
                </div>
                <div class="bluescreen-footer">
                    <p>Presiona ESC para salir</p>
                </div>
            </div>
        `;

        // Añadir al body
        document.body.appendChild(blueScreen);

        // Añadir evento para salir
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.body.removeChild(blueScreen);
                window.location.reload();
            }
        });

        // Reproducir sonido de error
        this.playSound('error');
    }

    /**
     * Reproducir un sonido
     * @param {string} soundName - Nombre del sonido a reproducir
     */
    playSound(soundName) {
        if (!this.state.soundEnabled) return;

        const sound = this.assets.sounds[soundName];
        if (sound) {
            const audio = new Audio(this.getAssetPath('sounds/' + sound));
            audio.play().catch(error => {
                console.warn('No se pudo reproducir el sonido:', error);
            });
        }
    }

    /**
     * Obtener la ruta completa a un recurso
     * @param {string} assetPath - Ruta relativa al recurso
     * @returns {string} - Ruta completa al recurso
     */
    getAssetPath(assetPath) {
        // Ruta base a los recursos (ajustar según la estructura del tema)
        const basePath = '/wp-content/themes/trashgenero-theme/assets/';
        return basePath + assetPath;
    }

    /**
     * Abrir el navegador
     */
    openBrowser() {
        // Crear ventana del navegador
        this.openWindow({
            title: 'Internet Explorer Trash',
            icon: 'browser',
            content: `
                <div class="trash-browser">
                    <div class="browser-toolbar">
                        <button class="browser-back">←</button>
                        <button class="browser-forward">→</button>
                        <button class="browser-reload">↻</button>
                        <div class="browser-address-bar">https://trashgenero.com</div>
                        <button class="browser-go">Ir</button>
                    </div>
                    <div class="browser-content">
                        <iframe src="https://trashgenero.com" width="100%" height="100%"></iframe>
                    </div>
                </div>
            `,
            width: 900,
            height: 600
        });
    }

    /**
     * Abrir el manifiesto
     */
    openManifesto() {
        // Crear ventana del manifiesto
        this.openWindow({
            title: 'Manifiesto Trashgènero',
            icon: 'manifesto',
            content: `
                <div class="trash-manifesto vhs-filter">
                    <div class="vhs-lines"></div>
                    <div class="vhs-noise"></div>
                    <div class="manifesto-content">
                        <h1 class="manifesto-title glitch-text" data-text="MANIFIESTO TRASHGÈNERO">MANIFIESTO TRASHGÈNERO</h1>
                        <div class="manifesto-text">
                            <p>Somos la nueva ola post-género, post-binaria, post-todo.</p>
                            <p>Nacimos del caos digital, de los glitches del sistema, de la basura estética que nadie quiere.</p>
                            <p>Rechazamos las categorías, abrazamos la contradicción, vivimos en el error.</p>
                            <p>Nuestra identidad es fluida como el mercurio, cambia como el píxel corrupto.</p>
                            <p>El kitsch es nuestra religión, el mal gusto nuestra bandera.</p>
                            <p>Somos lo cutre, lo exagerado, lo fuera de lugar.</p>
                            <p>No somos hombres, no somos mujeres, somos glitches en la matriz.</p>
                            <p>Somos el ruido, el error 404, la interferencia en tu señal.</p>
                            <p>Celebramos lo imperfecto, lo descartado, lo mutante.</p>
                            <p>Vestimos la contradicción, nos maquillamos con ironía.</p>
                            <p>El pasado y el futuro colapsan en nuestro presente bastardo.</p>
                            <p>No hay reglas, solo hay trash.</p>
                            <p class="manifesto-signature">Trashgènero, 2025</p>
                        </div>
                    </div>
                </div>
            `,
            width: 700,
            height: 500
        });
    }

    /**
     * Abrir la tienda
     */
    openShop() {
        // Crear ventana de la tienda
        const shopWindow = this.openWindow({
            title: 'Tienda Trashgènero',
            icon: 'shop',
            content: `
                <div class="trash-shop vhs-filter">
                    <div class="vhs-lines"></div>
                    <div class="vhs-noise"></div>
                    <div class="shop-loading">Cargando productos...</div>
                    <div class="shop-content" style="display: none;">
                        <!-- Contenido dinámico cargado mediante AJAX -->
                    </div>
                </div>
            `,
            width: 800,
            height: 600
        });

        // Simular carga de productos
        setTimeout(() => {
            const shopContent = shopWindow.element.querySelector('.shop-content');
            const shopLoading = shopWindow.element.querySelector('.shop-loading');
            
            if (shopContent && shopLoading) {
                shopLoading.style.display = 'none';
                shopContent.style.display = 'block';
                
                // Verificar si es miembro de la secta para mostrar ofertas especiales
                if (this.state.isSectMember) {
                    shopContent.innerHTML = `
                        <div class="shop-sect-banner">
                            <div class="sect-discount">
                                <span class="discount-badge">SECTA</span>
                                <span class="discount-text">Descuento exclusivo para miembros de la secta: 10%</span>
                            </div>
                            <div class="sect-points">
                                <span class="points-label">Multiplicador de puntos:</span>
                                <span class="points-value">${this.getPointsMultiplier(this.state.userRank)}x</span>
                            </div>
                        </div>
                        <div class="shop-products">
                            <!-- Lista de productos con indicaciones de secta -->
                        </div>
                    `;
                } else {
                    shopContent.innerHTML = `
                        <div class="shop-regular-banner">
                            <p>Únete a la secta fashion killer para obtener descuentos exclusivos y puntos por tus compras</p>
                        </div>
                        <div class="shop-products">
                            <!-- Lista regular de productos -->
                        </div>
                    `;
                }
                
                // Cargar productos (simulado)
                this.loadShopProducts(shopWindow);
            }
        }, 1500);
    }
    
    /**
     * Cargar productos de la tienda
     * @param {Object} shopWindow - Referencia a la ventana de la tienda
     */
    loadShopProducts(shopWindow) {
        // En producción esto sería una llamada AJAX a la API de WooCommerce
        const productsContainer = shopWindow.element.querySelector('.shop-products');
        
        if (productsContainer) {
            // Aquí iría la lógica para cargar productos, este es solo un ejemplo
            productsContainer.innerHTML = `
                <div class="product-grid">
                    <div class="product-item">
                        <div class="product-image">
                            <img src="${this.getAssetPath('gallery/collection-1.jpg')}" alt="Producto 1">
                        </div>
                        <div class="product-info">
                            <h3>Camiseta Glitch Corrupted</h3>
                            <div class="product-price">29,99 €</div>
                            ${this.state.isSectMember ? '<div class="sect-product-bonus">+20 puntos</div>' : ''}
                            <button class="pixel-button add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>
                    
                    <div class="product-item">
                        <div class="product-image">
                            <img src="${this.getAssetPath('gallery/collection-2.jpg')}" alt="Producto 2">
                        </div>
                        <div class="product-info">
                            <h3>Pantalón Binary Crash</h3>
                            <div class="product-price">49,99 €</div>
                            ${this.state.isSectMember ? '<div class="sect-product-bonus">+50 puntos</div>' : ''}
                            <button class="pixel-button add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>
                    
                    ${this.state.isSectMember && this.isHighRankMember() ? `
                    <div class="product-item exclusive">
                        <div class="exclusive-badge">EXCLUSIVO SECTA</div>
                        <div class="product-image">
                            <img src="${this.getAssetPath('gallery/collection-3.jpg')}" alt="Producto Exclusivo">
                        </div>
                        <div class="product-info">
                            <h3>Chaqueta Ritual Deluxe</h3>
                            <div class="product-price">99,99 €</div>
                            <div class="sect-product-bonus">+200 puntos</div>
                            <button class="pixel-button add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
            
            // Añadir eventos a los botones
            const addToCartButtons = productsContainer.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.playSound('click');
                    
                    // Si es miembro de la secta, añadir puntos
                    if (this.state.isSectMember) {
                        const productItem = button.closest('.product-item');
                        const bonusText = productItem.querySelector('.sect-product-bonus');
                        
                        if (bonusText) {
                            const bonusPoints = parseInt(bonusText.textContent.match(/\d+/)[0]);
                            
                            // Multiplicar por el factor según rango
                            const multiplier = this.getPointsMultiplier(this.state.userRank);
                            const totalPoints = Math.floor(bonusPoints * multiplier);
                            
                            // Añadir puntos
                            this.addUserPoints(totalPoints);
                            
                            // Mostrar notificación
                            this.showNotification('Puntos añadidos', `Has ganado ${totalPoints} puntos por tu compra`, 'ritual');
                        }
                    }
                    
                    // Mostrar notificación de carrito
                    this.showNotification('Carrito actualizado', 'Producto añadido al carrito', 'success');
                });
            });
        }
    }

    /**
     * Abrir la galería
     */
    openGallery() {
        // Crear ventana de la galería
        const galleryWindow = this.openWindow({
            title: 'Galería Trashgènero',
            icon: 'gallery',
            content: `
                <div class="trash-gallery vhs-filter">
                    <div class="vhs-lines"></div>
                    <div class="vhs-noise"></div>
                    <div class="gallery-loading">Cargando imágenes...</div>
                    <div class="gallery-content" style="display: none;"></div>
                </div>
            `,
            width: 900,
            height: 600
        });

        // Simular carga de imágenes
        setTimeout(() => {
            const galleryContent = galleryWindow.element.querySelector('.gallery-content');
            const galleryLoading = galleryWindow.element.querySelector('.gallery-loading');
            
            if (galleryContent && galleryLoading) {
                galleryLoading.style.display = 'none';
                galleryContent.style.display = 'block';
                
                // Cargar imágenes normales
                const regularImages = `
                    <div class="gallery-section">
                        <h2 class="section-title">Colección 2025</h2>
                        <div class="gallery-grid">
                            <div class="gallery-item">
                                <img src="${this.getAssetPath('gallery/collection-1.jpg')}" alt="Colección 1">
                            </div>
                            <div class="gallery-item">
                                <img src="${this.getAssetPath('gallery/collection-2.jpg')}" alt="Colección 2">
                            </div>
                            <div class="gallery-item">
                                <img src="${this.getAssetPath('gallery/collection-3.jpg')}" alt="Colección 3">
                            </div>
                        </div>
                    </div>
                `;
                
                // Cargar imágenes de rituales si es miembro de la secta
                const ritualImages = this.state.isSectMember ? `
                    <div class="gallery-section ritual-section">
                        <h2 class="section-title">Rituales de la Secta</h2>
                        <div class="gallery-grid">
                            <div class="gallery-item ritual-item">
                                <img src="${this.getAssetPath('rituals/ritual-1.jpg')}" alt="Ritual 1">
                            </div>
                            <div class="gallery-item ritual-item">
                                <img src="${this.getAssetPath('rituals/ritual-2.jpg')}" alt="Ritual 2">
                            </div>
                            ${this.isHighRankMember() ? `
                            <div class="gallery-item ritual-item exclusive">
                                <div class="exclusive-badge">ALTO RANGO</div>
                                <img src="${this.getAssetPath('rituals/ritual-3.jpg')}" alt="Ritual 3">
                            </div>
                            ` : ''}
                        </div>
                    </div>
                ` : '';
                
                galleryContent.innerHTML = regularImages + ritualImages;
                
                // Añadir eventos a las imágenes para ampliarlas
                const galleryItems = galleryContent.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.addEventListener('click', () => {
                        this.playSound('click');
                        const img = item.querySelector('img');
                        this.openLightbox(img.src, img.alt);
                    });
                });
            }
        }, 1500);
    }
    
    /**
     * Abrir lightbox para ver imagen ampliada
     * @param {string} src - URL de la imagen
     * @param {string} alt - Texto alternativo
     */
    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'trash-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <div class="lightbox-caption">${alt}</div>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Añadir evento para cerrar
        const closeButton = lightbox.querySelector('.lightbox-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
        }
        
        // Añadir evento para cerrar con Escape
        const escapeHandler = (event) => {
            if (event.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        
        document.addEventListener('keydown', escapeHandler);
        
        // Añadir evento para cerrar al hacer clic fuera
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    /**
     * Abrir el blog
     */
    openBlog() {
        // Crear ventana del blog
        this.openWindow({
            title: 'Blog Trashgènero',
            icon: 'blog',
            content: `
                <div class="trash-browser">
                    <div class="browser-toolbar">
                        <button class="browser-back">←</button>
                        <button class="browser-forward">→</button>
                        <button class="browser-reload">↻</button>
                        <div class="browser-address-bar">https://trashgenero.com/blog</div>
                        <button class="browser-go">Ir</button>
                    </div>
                    <div class="browser-content">
                        <iframe src="https://trashgenero.com/blog" width="100%" height="100%"></iframe>
                    </div>
                </div>
            `,
            width: 900,
            height: 600
        });
    }
    
    /**
     * Abrir la página para unirse a la secta
     */
    openJoinSect() {
        // Crear ventana para unirse
        this.openWindow({
            title: 'Unirse a la Secta Fashion Killer',
            icon: 'ritual',
            content: `
                <div class="join-sect-container vhs-filter">
                    <div class="vhs-lines"></div>
                    <div class="vhs-noise"></div>
                    
                    <h1 class="sect-title glitch-text" data-text="Fashion Killer Secta">Fashion Killer Secta</h1>
                    
                    <div class="sect-description">
                        <p>Únete a la secta transgresora de la moda. Rompe con lo normativo, abraza el caos estético.</p>
                        <p>Como miembro de la secta obtendrás:</p>
                        <ul>
                            <li>Acceso a rituales secretos de Trashgènero</li>
                            <li>Productos exclusivos</li>
                            <li>Descuentos especiales</li>
                            <li>Sistema de rangos y puntos transgresivos</li>
                            <li>Contenido exclusivo según tu nivel</li>
                        </ul>
                    </div>
                    
                    <div class="sect-oath">
                        <h2>Juramento Trashgènero</h2>
                        <div class="oath-text">
                            <p>Juro por el glitch eterno rechazar lo normativo, abrazar lo kitsch, y llevar el trash como un estandarte.</p>
                            <p>Mi identidad será fluida como el error digital, cambiante como el VHS deteriorado.</p>
                            <p>Desafiaré los binarios, cuestionaré la moda hegemónica, y seré un agente del caos estético.</p>
                        </div>
                    </div>
                    
                    <div class="join-actions">
                        <button class="neon-button join-sect-btn">Acepto el Juramento</button>
                        <div class="join-cancel">Volver al escritorio</div>
                    </div>
                </div>
            `,
            width: 700,
            height: 550,
            resizable: false
        });
    }
    
    /**
     * Abrir el panel de la secta
     */
    openSectDashboard() {
        // Verificar que el usuario es miembro
        if (!this.state.isSectMember) {
            this.showNotification('Error de acceso', 'No eres miembro de la secta', 'error');
            return;
        }
        
        // Crear ventana del panel
        const dashboardWindow = this.openWindow({
            title: 'Secta Fashion Killer',
            icon: 'ritual',
            content: `
                <div class="sect-dashboard vhs-filter">
                    <div class="vhs-lines"></div>
                    <div class="vhs-noise"></div>
                    
                    <div class="dashboard-header">
                        <div class="user-rank">
                            <span class="rank-icon">${this.getRankIcon(this.state.userRank)}</span>
                            <span class="rank-name">${this.state.userRank}</span>
                        </div>
                        
                        <div class="user-points">
                            <span class="points-value">${this.state.userPoints}</span>
                            <span class="points-label">puntos transgresivos</span>
                        </div>
                        
                        <div class="rank-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${this.calculateRankProgress()}%"></div>
                            </div>
                            <div class="progress-text">
                                ${this.getNextRank() !== 'Rango máximo alcanzado' 
                                    ? `${this.getPointsNeededForNextRank()} puntos para ${this.getNextRank()}`
                                    : '¡Has alcanzado el rango máximo!'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-tabs">
                        <div class="tab active" data-tab="missions">Misiones</div>
                        <div class="tab" data-tab="rituals">Rituales</div>
                        <div class="tab" data-tab="badges">Insignias</div>
                        <div class="tab" data-tab="members">Miembros</div>
                        ${this.isHighRankMember() ? '<div class="tab" data-tab="secret">Secreto</div>' : ''}
                    </div>
                    
                    <div class="dashboard-content">
                        <div class="tab-panel active" id="tab-missions">
                            <h2>Misiones Transgresivas</h2>
                            <div class="missions-container"></div>
                        </div>
                        
                        <div class="tab-panel" id="tab-rituals">
                            <h2>Rituales de la Secta</h2>
                            <div class="rituals-container"></div>
                        </div>
                        
                        <div class="tab-panel" id="tab-badges">
                            <h2>Tus Insignias</h2>
                            <div class="badges-container"></div>
                        </div>
                        
                        <div class="tab-panel" id="tab-members">
                            <h2>Miembros de la Secta</h2>
                            <div class="members-container"></div>
                        </div>
                        
                        ${this.isHighRankMember() ? `
                        <div class="tab-panel" id="tab-secret">
                            <h2>Contenido Secreto</h2>
                            <div class="secret-container"></div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `,
            width: 900,
            height: 650
        });
        
        // Configurar pestañas
        this.setupDashboardTabs(dashboardWindow);
        
        // Cargar datos iniciales (misiones)
        this.loadMissionsData(dashboardWindow);
    }
    
    /**
     * Configurar las pestañas del panel de la secta
     * @param {Object} dashboardWindow - Referencia a la ventana del panel
     */
    setupDashboardTabs(dashboardWindow) {
        const tabs = dashboardWindow.element.querySelectorAll('.tab');
        const panels = dashboardWindow.element.querySelectorAll('.tab-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.playSound('click');
                
                // Quitar clase activa
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Añadir clase activa
                tab.classList.add('active');
                const tabId = `tab-${tab.dataset.tab}`;
                dashboardWindow.element.querySelector(`#${tabId}`).classList.add('active');
                
                // Cargar datos según la pestaña
                switch (tab.dataset.tab) {
                    case 'missions':
                        this.loadMissionsData(dashboardWindow);
                        break;
                    case 'rituals':
                        this.loadRitualsData(dashboardWindow);
                        break;
                    case 'badges':
                        this.loadBadgesData(dashboardWindow);
                        break;
                    case 'members':
                        this.loadMembersData(dashboardWindow);
                        break;
                    case 'secret':
                        this.loadSecretData(dashboardWindow);
                        break;
                }
            });
        });
    }
    
    /**
     * Cargar datos de misiones
     * @param {Object} dashboardWindow - Referencia a la ventana del panel
     */
    loadMissionsData(dashboardWindow) {
        const missionsContainer = dashboardWindow.element.querySelector('.missions-container');
        
        if (missionsContainer) {
            missionsContainer.innerHTML = '<div class="loading-spinner">Cargando misiones...</div>';
            
            // Simular carga de datos
            setTimeout(() => {
                // En producción, esto vendría del backend
                const missionsHTML = `
                    <div class="missions-available">
                        <h3 class="available-title">Misiones Disponibles</h3>
                        
                        <div class="mission-item daily">
                            <div class="mission-header">
                                <span class="mission-type">Diaria</span>
                                <span class="mission-points">+20 puntos</span>
                            </div>
                            <h4 class="mission-name">Desafía los binarios</h4>
                            <p class="mission-description">Usa una prenda que no corresponda a tu género asignado y comparte una foto.</p>
                            <div class="mission-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 0%"></div>
                                </div>
                                <div class="progress-text">0/1</div>
                            </div>
                            <button class="neon-mini-button complete-mission-btn" data-mission-id="mission1">Completar</button>
                        </div>
                        
                        <div class="mission-item weekly">
                            <div class="mission-header">
                                <span class="mission-type">Semanal</span>
                                <span class="mission-points">+50 puntos</span>
                            </div>
                            <h4 class="mission-name">Intervención Kitsch</h4>
                            <p class="mission-description">Intervén un espacio público con elementos kitsch y comparte el resultado.</p>
                            <div class="mission-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 30%"></div>
                                </div>
                                <div class="progress-text">1/3</div>
                            </div>
                            <button class="neon-mini-button complete-mission-btn" data-mission-id="mission2">Actualizar progreso</button>
                        </div>
                        
                        ${this.isHighRankMember() ? `
                        <div class="mission-item sect">
                            <div class="mission-header">
                                <span class="mission-type">Secta</span>
                                <span class="mission-points">+150 puntos</span>
                            </div>
                            <h4 class="mission-name">Rito de Consagración</h4>
                            <p class="mission-description">Crea un ritual personal de transformación y compártelo con la secta.</p>
                            <div class="mission-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 0%"></div>
                                </div>
                                <div class="progress-text">0/1</div>
                            </div>
                            <button class="neon-mini-button complete-mission-btn" data-mission-id="mission3">Completar</button>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="missions-completed">
                        <h3 class="completed-title">Misiones Completadas</h3>
                        
                        <div class="mission-item completed">
                            <div class="mission-header">
                                <span class="mission-type">Completada</span>
                                <span class="mission-points">+30 puntos</span>
                            </div>
                            <h4 class="mission-name">Manifiesto Personal</h4>
                            <p class="mission-description">Escribe tu propio manifiesto trash y compártelo en redes sociales.</p>
                            <div class="mission-completed-date">Completada: 2025-04-05</div>
                        </div>
                    </div>
                `;
                
                missionsContainer.innerHTML = missionsHTML;
                
                // Añadir eventos a los botones
                const completeButtons = missionsContainer.querySelectorAll('.complete-mission-btn');
                completeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.playSound('click');
                        const missionId = button.dataset.missionId;
                        this.completeMission(missionId, button);
                    });
                });
            }, 1000);
        }
    }
    
    /**
     * Completar una misión
     * @param {string} missionId - ID de la misión
     * @param {HTMLElement} button - Botón que activó la acción
     */
    completeMission(missionId, button) {
        // En producción, esto sería una llamada AJAX al backend
        
        // Simular éxito de completar misión
        const missionItem = button.closest('.mission-item');
        const progressBar = missionItem.querySelector('.progress-fill');
        const progressText = missionItem.querySelector('.progress-text');
        const pointsText = missionItem.querySelector('.mission-points');
        
        if (progressBar && progressText && pointsText) {
            // Extraer puntos
            const points = parseInt(pointsText.textContent.match(/\d+/)[0]);
            
            // Extraer progreso actual
            const progressMatch = progressText.textContent.match(/(\d+)\/(\d+)/);
            if (progressMatch) {
                const current = parseInt(progressMatch[1]);
                const total = parseInt(progressMatch[2]);
                
                if (current < total) {
                    // Actualizar progreso
                    const newCurrent = current + 1;
                    const percentage = (newCurrent / total) * 100;
                    
                    progressBar.style.width = `${percentage}%`;
                    progressText.textContent = `${newCurrent}/${total}`;
                    
                    // Si se completa la misión
                    if (newCurrent >= total) {
                        missionItem.classList.add('completed');
                        button.textContent = 'Completada';
                        button.disabled = true;
                        
                        // Añadir puntos al usuario
                        this.addUserPoints(points);
                        
                        // Mostrar notificación
                        this.showNotification('Misión completada', `Has ganado ${points} puntos transgresivos`, 'ritual');
                        
                        // Verificar si el usuario sube de rango
                        this.checkRankUp();
                        
                        // También podríamos añadir una insignia si corresponde
                        if (missionId === 'mission3') {
                            this.addUserBadge({
                                id: 'badge_ritual_master',
                                icon: '🔮',
                                title: 'Maestro de Rituales',
                                description: 'Has creado un ritual personal trascendente',
                                color: '#ff00ff'
                            });
                            
                            this.showNotification('¡Nueva Insignia!', 'Has obtenido: Maestro de Rituales', 'ritual');
                        }
                    } else {
                        // Mostrar notificación de progreso
                        this.showNotification('Progreso actualizado', `Misión: ${newCurrent}/${total} completado`, 'success');
                    }
                    
                    // Trigger de Easter Egg aleatorio
                    if (Math.random() < 0.3) {
                        this.triggerEasterEgg();
                    }
                }
            }
        }
    }
    
    /**
     * Cargar datos de rituales
     * @param {Object} dashboardWindow - Referencia a la ventana del panel
     */
    loadRitualsData(dashboardWindow) {
        const ritualsContainer = dashboardWindow.element.querySelector('.rituals-container');
        
        if (ritualsContainer) {
            ritualsContainer.innerHTML = '<div class="loading-spinner">Cargando rituales...</div>';
            
            // Simular carga de datos
            setTimeout(() => {
                // En producción, esto vendría del backend
                let ritualsHTML = `
                    <div class="upcoming-rituals">
                        <h3 class="upcoming-title">Próximos Rituales</h3>
                `;
                
                // Añadir rituales del estado
                this.state.rituals.forEach(ritual => {
                    // Verificar si el usuario puede participar según su rango
                    const canAttend = this.canAttendRitual(ritual.id);
                    const isAttending = this.isAttendingRitual(ritual.id);
                    
                    ritualsHTML += `
                        <div class="ritual-item ${isAttending ? 'confirmed' : ''} ${!canAttend ? 'restricted' : ''}">
                            <div class="ritual-date">${ritual.date} - ${ritual.time}</div>
                            <h4 class="ritual-name">${ritual.title}</h4>
                            <div class="ritual-description">
                                <p>${ritual.description}</p>
                            </div>
                            <div class="ritual-location">
                                <span class="location-label">Ubicación:</span>
                                <span class="location-value">${ritual.location}</span>
                            </div>
                            <div class="ritual-details">
                                <span class="detail-item">
                                    <span class="detail-label">Rango requerido:</span>
                                    <span class="detail-value ${!canAttend ? 'restricted' : ''}">${ritual.requiredRank}</span>
                                </span>
                                <span class="detail-item">
                                    <span class="detail-label">Puntos:</span>
                                    <span class="detail-value">${ritual.points}</span>
                                </span>
                                <span class="detail-item">
                                    <span class="detail-label">Asistentes:</span>
                                    <span class="detail-value">${ritual.attendees}/${ritual.capacity}</span>
                                </span>
                            </div>
                            <div class="ritual-status">
                                Estado: <span class="status-text">${isAttending ? 'Asistencia confirmada' : (canAttend ? 'Pendiente de confirmar' : 'No puedes asistir')}</span>
                            </div>
                            <div class="ritual-actions">
                                ${canAttend ? (
                                    isAttending ? 
                                    `<button class="neon-mini-button cancel-ritual-btn" data-ritual-id="${ritual.id}">Cancelar asistencia</button>` :
                                    `<button class="neon-mini-button attend-ritual-btn" data-ritual-id="${ritual.id}">Confirmar asistencia</button>`
                                ) : `<button class="neon-mini-button disabled">Rango insuficiente</button>`}
                                
                                ${ritual.photos && ritual.photos.length > 0 ? 
                                `<button class="neon-mini-button view-photos-btn" data-ritual-id="${ritual.id}">Ver fotos</button>` : ''}
                                
                                ${ritual.testimonies && ritual.testimonies.length > 0 ? 
                                `<button class="neon-mini-button view-testimonies-btn" data-ritual-id="${ritual.id}">Ver testimonios</button>` : ''}
                            </div>
                        </div>
                    `;
                });
                
                ritualsHTML += `
                    </div>
                    
                    <div class="rituals-your-level">
                        <h3 class="level-title">Tu Nivel en la Secta</h3>
                        <div class="level-info">
                            <div class="ritual-rank">
                                Rango actual: <span class="rank-name">${this.state.userRank}</span>
                            </div>
                            <div class="ritual-clearance">
                                Nivel de acceso: <span class="clearance-level">${this.getRitualClearanceLevel()}</span>
                            </div>
                            <div class="ritual-next">
                                Para desbloquear más rituales, necesitas alcanzar los siguientes rangos:
                                <ul>
                                    ${this.getNextRitualRequirements()}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                ritualsContainer.innerHTML = ritualsHTML;
                
                // Añadir eventos a los botones
                const attendButtons = ritualsContainer.querySelectorAll('.attend-ritual-btn');
                attendButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.playSound('click');
                        const ritualId = button.dataset.ritualId;
                        this.attendRitual(ritualId, button);
                    });
                });
                
                const cancelButtons = ritualsContainer.querySelectorAll('.cancel-ritual-btn');
                cancelButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.playSound('click');
                        const ritualId = button.dataset.ritualId;
                        this.cancelRitualAttendance(ritualId, button);
                    });
                });
                
                const photoButtons = ritualsContainer.querySelectorAll('.view-photos-btn');
                photoButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.playSound('click');
                        const ritualId = button.dataset.ritualId;
                        this.viewRitualPhotos(ritualId);
                    });
                });
                
                const testimonyButtons = ritualsContainer.querySelectorAll('.view-testimonies-btn');
                testimonyButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.playSound('click');
                        const ritualId = button.dataset.ritualId;
                        this.viewRitualTestimonies(ritualId);
                    });
                });
            }, 1000);
        }
    }
    
    /**
     * Obtener nivel de acceso a rituales
     * @returns {string} - Descripción del nivel de acceso
     */
    getRitualClearanceLevel() {
        const ranks = [
            'Novicix Normativo',
            'Discípulx Kitsch',
            'Aprendiz Maricón',
            'Sacerdotx Provocativx',
            'Obispx del Glitch',
            'Cardenalx Irreverente',
            'Sumo Pontífice Trash'
        ];
                const userRankIndex = ranks.indexOf(this.state.userRank);
        
        if (userRankIndex === -1) return 'Desconocido';
        
        if (userRankIndex >= 5) return 'Nivel Supremo - Acceso a todos los rituales';
        if (userRankIndex >= 3) return 'Nivel Alto - Acceso a rituales de transgresión avanzada';
        if (userRankIndex >= 1) return 'Nivel Intermedio - Acceso a rituales de iniciación';
        return 'Nivel Básico - Acceso a rituales de noviciado';
    }
    
    /**
     * Obtener requisitos para el siguiente nivel de rituales
     * @returns {string} - HTML con los requisitos
     */
    getNextRitualRequirements() {
        const ranks = [
            'Novicix Normativo',
            'Discípulx Kitsch',
            'Aprendiz Maricón',
            'Sacerdotx Provocativx',
            'Obispx del Glitch',
            'Cardenalx Irreverente',
            'Sumo Pontífice Trash'
        ];
        
        const userRankIndex = ranks.indexOf(this.state.userRank);
        
        if (userRankIndex === -1) return '<li>Error al determinar rango</li>';
        if (userRankIndex >= 5) return '<li>Has alcanzado el máximo nivel de rituales</li>';
        
        let requirements = '';
        
        if (userRankIndex < 1) {
            requirements += `<li><strong>Discípulx Kitsch</strong>: Rituales de iniciación</li>`;
        }
        
        if (userRankIndex < 3) {
            requirements += `<li><strong>Sacerdotx Provocativx</strong>: Rituales de transgresión avanzada</li>`;
        }
        
        if (userRankIndex < 5) {
            requirements += `<li><strong>Cardenalx Irreverente</strong>: Rituales secretos de alto nivel</li>`;
        }
        
        return requirements;
    }
    
    /**
     * Confirmar asistencia a un ritual
     * @param {string} ritualId - ID del ritual
     * @param {HTMLElement} button - Botón que activó la acción
     */
    attendRitual(ritualId, button) {
        // En producción, esto sería una llamada AJAX al backend
        
        // Encontrar el ritual
        const ritual = this.state.rituals.find(r => r.id === ritualId);
        
        if (ritual) {
            // Verificar si hay espacio
            if (ritual.attendees >= ritual.capacity) {
                this.showNotification('Error', 'El ritual ha alcanzado su capacidad máxima', 'error');
                return;
            }
            
            // Verificar si el usuario puede asistir
            if (!this.canAttendRitual(ritualId)) {
                this.showNotification('Acceso denegado', `Necesitas ser ${ritual.requiredRank} o superior`, 'error');
                return;
            }
            
            // Simular éxito
            ritual.attendees += 1;
            
            // Añadir a la lista de rituales del usuario
            if (!this.state.userRituals) this.state.userRituals = [];
            
            this.state.userRituals.push({
                id: ritualId,
                title: ritual.title,
                date: ritual.date,
                status: 'confirmed'
            });
            
            // Guardar en localStorage
            this.saveUserData('userRituals', this.state.userRituals);
            
            // Actualizar UI
            if (button) {
                const ritualItem = button.closest('.ritual-item');
                
                if (ritualItem) {
                    ritualItem.classList.add('confirmed');
                    
                    const statusText = ritualItem.querySelector('.status-text');
                    if (statusText) {
                        statusText.textContent = 'Asistencia confirmada';
                    }
                    
                    const detailValue = ritualItem.querySelector('.detail-item:nth-child(3) .detail-value');
                    if (detailValue) {
                        const [current, max] = detailValue.textContent.split('/');
                        detailValue.textContent = `${parseInt(current) + 1}/${max}`;
                    }
                    
                    // Reemplazar botón
                    button.outerHTML = `<button class="neon-mini-button cancel-ritual-btn" data-ritual-id="${ritualId}">Cancelar asistencia</button>`;
                    
                    // Añadir evento al nuevo botón
                    const cancelButton = ritualItem.querySelector('.cancel-ritual-btn');
                    if (cancelButton) {
                        cancelButton.addEventListener('click', () => {
                            this.playSound('click');
                            this.cancelRitualAttendance(ritualId, cancelButton);
                        });
                    }
                }
            }
            
            // Mostrar notificación
            this.showNotification('Ritual confirmado', `Te esperamos el ${ritual.date} a las ${ritual.time}`, 'ritual');
        }
    }
    
    /**
     * Cancelar asistencia a un ritual
     * @param {string} ritualId - ID del ritual
     * @param {HTMLElement} button - Botón que activó la acción
     */
    cancelRitualAttendance(ritualId, button) {
        // En producción, esto sería una llamada AJAX al backend
        
        // Encontrar el ritual
        const ritual = this.state.rituals.find(r => r.id === ritualId);
        
        if (ritual) {
            // Simular éxito
            if (ritual.attendees > 0) {
                ritual.attendees -= 1;
            }
            
            // Eliminar de la lista de rituales del usuario
            if (this.state.userRituals) {
                this.state.userRituals = this.state.userRituals.filter(r => r.id !== ritualId);
                
                // Guardar en localStorage
                this.saveUserData('userRituals', this.state.userRituals);
            }
            
            // Actualizar UI
            if (button) {
                const ritualItem = button.closest('.ritual-item');
                
                if (ritualItem) {
                    ritualItem.classList.remove('confirmed');
                    
                    const statusText = ritualItem.querySelector('.status-text');
                    if (statusText) {
                        statusText.textContent = 'Pendiente de confirmar';
                    }
                    
                    const detailValue = ritualItem.querySelector('.detail-item:nth-child(3) .detail-value');
                    if (detailValue) {
                        const [current, max] = detailValue.textContent.split('/');
                        detailValue.textContent = `${parseInt(current) - 1}/${max}`;
                    }
                    
                    // Reemplazar botón
                    button.outerHTML = `<button class="neon-mini-button attend-ritual-btn" data-ritual-id="${ritualId}">Confirmar asistencia</button>`;
                    
                    // Añadir evento al nuevo botón
                    const attendButton = ritualItem.querySelector('.attend-ritual-btn');
                    if (attendButton) {
                        attendButton.addEventListener('click', () => {
                            this.playSound('click');
                            this.attendRitual(ritualId, attendButton);
                        });
                    }
                }
            }
            
            // Mostrar notificación
            this.showNotification('Asistencia cancelada', `Has cancelado tu asistencia al ritual`, 'warning');
        }
    }
    
    /**
     * Ver fotos de un ritual
     * @param {string} ritualId - ID del ritual
     */
    viewRitualPhotos(ritualId) {
        // Encontrar el ritual
        const ritual = this.state.rituals.find(r => r.id === ritualId);
        
        if (ritual && ritual.photos && ritual.photos.length > 0) {
            // Crear ventana modal
            this.openWindow({
                title: `Fotos: ${ritual.title}`,
                icon: 'ritual',
                content: `
                    <div class="ritual-photos vhs-filter">
                        <div class="vhs-lines"></div>
                        <div class="vhs-noise"></div>
                        
                        <h2 class="photos-title">${ritual.title}</h2>
                        <div class="photos-date">${ritual.date}</div>
                        
                        <div class="photos-grid">
                            ${ritual.photos.map(photo => `
                                <div class="photo-item">
                                    <img src="${this.getAssetPath('rituals/' + photo)}" alt="Foto de ritual">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `,
                width: 800,
                height: 600,
                resizable: true
            });
        } else {
            this.showNotification('Sin fotos', 'Este ritual no tiene fotos disponibles', 'warning');
        }
    }
    
    /**
     * Ver testimonios de un ritual
     * @param {string} ritualId - ID del ritual
     */
    viewRitualTestimonies(ritualId) {
        // Encontrar el ritual
        const ritual = this.state.rituals.find(r => r.id === ritualId);
        
        if (ritual && ritual.testimonies && ritual.testimonies.length > 0) {
            // Crear ventana modal
            this.openWindow({
                title: `Testimonios: ${ritual.title}`,
                icon: 'ritual',
                content: `
                    <div class="ritual-testimonies vhs-filter">
                        <div class="vhs-lines"></div>
                        <div class="vhs-noise"></div>
                        
                        <h2 class="testimonies-title">${ritual.title}</h2>
                        <div class="testimonies-date">${ritual.date}</div>
                        
                        <div class="testimonies-list">
                            ${ritual.testimonies.map(testimony => `
                                <div class="testimony-item">
                                    <div class="testimony-author">${testimony.author}</div>
                                    <div class="testimony-text">${testimony.text}</div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="add-testimony">
                            <h3>Añade tu testimonio</h3>
                            <textarea class="testimony-input" placeholder="Escribe tu experiencia..."></textarea>
                            <button class="pixel-button add-testimony-btn" data-ritual-id="${ritualId}">Enviar testimonio</button>
                        </div>
                    </div>
                `,
                width: 700,
                height: 550,
                resizable: true
            });
        } else {
            this.showNotification('Sin testimonios', 'Este ritual no tiene testimonios disponibles', 'warning');
        }
    }
    
    /**
     * Cargar datos de insignias
     * @param {Object} dashboardWindow - Referencia a la ventana del panel
     */
    loadBadgesData(dashboardWindow) {
        const badgesContainer = dashboardWindow.element.querySelector('.badges-container');
        
        if (badgesContainer) {
            badgesContainer.innerHTML = '<div class="loading-spinner">Cargando insignias...</div>';
            
            // Simular carga de datos
            setTimeout(() => {
                // Examinar insignias del usuario
                const userBadges = this.state.userBadges || [];
                
                if (userBadges.length === 0) {
                    badgesContainer.innerHTML = `
                        <div class="no-badges">
                            <h3>Aún no tienes insignias</h3>
                            <p>Completa misiones y asiste a rituales para desbloquear insignias especiales.</p>
                        </div>
                    `;
                    return;
                }
                
                let badgesHTML = `<div class="badges-grid">`;
                
                userBadges.forEach(badge => {
                    badgesHTML += `
                        <div class="badge-item" data-badge-id="${badge.id}">
                            <div class="badge-icon" style="background-color: ${badge.color || '#f0f'};">${badge.icon}</div>
                            <div class="badge-info">
                                <h4 class="badge-title">${badge.title}</h4>
                                <p class="badge-description">${badge.description}</p>
                            </div>
                            <div class="badge-actions">
                                <button class="pixel-button use-badge-btn" data-badge-id="${badge.id}">Usar en perfil</button>
                            </div>
                        </div>
                    `;
                });
                
                badgesHTML += `</div>`;
                
                // Añadir sección de insignias disponibles
                badgesHTML += `
                    <div class="badges-available">
                        <h3>Insignias disponibles</h3>
                        <div class="available-badges-grid">
                            <div class="badge-item locked">
                                <div class="badge-icon" style="background-color: #555;">?</div>
                                <div class="badge-info">
                                    <h4 class="badge-title">Provocador Ancestral</h4>
                                    <p class="badge-description">Asiste a 5 rituales</p>
                                </div>
                                <div class="badge-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 20%"></div>
                                    </div>
                                    <div class="progress-text">1/5</div>
                                </div>
                            </div>
                            
                            <div class="badge-item locked">
                                <div class="badge-icon" style="background-color: #555;">?</div>
                                <div class="badge-info">
                                    <h4 class="badge-title">Transgresión Total</h4>
                                    <p class="badge-description">Alcanza 1000 puntos transgresivos</p>
                                </div>
                                <div class="badge-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${this.state.userPoints / 10}%"></div>
                                    </div>
                                    <div class="progress-text">${this.state.userPoints}/1000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                badgesContainer.innerHTML = badgesHTML;
                
                // Añadir eventos a los botones
                const useBadgeButtons = badgesContainer.querySelectorAll('.use-badge-btn');
                useBadgeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.playSound('click');
                        const badgeId = button.dataset.badgeId;
                        this.setActiveBadge(badgeId);
                    });
                });
            }, 1000);
        }
    }
    
    /**
     * Establecer insignia activa
     * @param {string} badgeId - ID de la insignia
     */
    setActiveBadge(badgeId) {
        // En producción, esto sería una llamada AJAX al backend
        this.saveUserData('activeBadge', badgeId);
        
        // Actualizar UI - seleccionar la insignia activa
        const badgeItems = document.querySelectorAll('.badge-item');
        badgeItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.badgeId === badgeId) {
                item.classList.add('active');
            }
        });
        
        // Mostrar notificación
        this.showNotification('Insignia seleccionada', 'Tu insignia activa ha sido actualizada', 'success');
    }
    
    /**
     * Cargar datos de miembros
     * @param {Object} dashboardWindow - Referencia a la ventana del panel
     */
    loadMembersData(dashboardWindow) {
        const membersContainer = dashboardWindow.element.querySelector('.members-container');
        
        if (membersContainer) {
            membersContainer.innerHTML = '<div class="loading-spinner">Cargando miembros...</div>';
            
            // Simular carga de datos
            setTimeout(() => {
                // En producción, esto vendría del backend
                const membersHTML = `
                    <div class="members-search">
                        <input type="text" class="members-search-input" placeholder="Buscar miembros...">
                        <button class="pixel-button search-btn">Buscar</button>
                    </div>
                    
                    <div class="members-list">
                        <div class="member-item">
                            <div class="member-avatar">👤</div>
                            <div class="member-info">
                                <h4 class="member-name">darkglitch23</h4>
                                <div class="member-rank">Cardenalx Irreverente</div>
                                <div class="member-points">5432 puntos</div>
                            </div>
                            <div class="member-badge">🌟</div>
                        </div>
                        
                        <div class="member-item">
                            <div class="member-avatar">👤</div>
                            <div class="member-info">
                                <h4 class="member-name">kitschqueenXXX</h4>
                                <div class="member-rank">Obispx del Glitch</div>
                                <div class="member-points">3211 puntos</div>
                            </div>
                            <div class="member-badge">🔮</div>
                        </div>
                        
                        <div class="member-item current-user">
                            <div class="member-avatar">👤</div>
                            <div class="member-info">
                                <h4 class="member-name">TÚ</h4>
                                <div class="member-rank">${this.state.userRank}</div>
                                <div class="member-points">${this.state.userPoints} puntos</div>
                            </div>
                            <div class="member-badge">${this.getActiveBadgeIcon()}</div>
                        </div>
                        
                        <div class="member-item">
                            <div class="member-avatar">👤</div>
                            <div class="member-info">
                                <h4 class="member-name">trashkid99</h4>
                                <div class="member-rank">Aprendiz Maricón</div>
                                <div class="member-points">875 puntos</div>
                            </div>
                        </div>
                        
                        <div class="member-item">
                            <div class="member-avatar">👤</div>
                            <div class="member-info">
                                <h4 class="member-name">cyberwitchUwU</h4>
                                <div class="member-rank">Discípulx Kitsch</div>
                                <div class="member-points">342 puntos</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="members-stats">
                        <h3>Estadísticas de la Secta</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-value">108</div>
                                <div class="stat-label">Miembros totales</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">23</div>
                                <div class="stat-label">Rituales realizados</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">5</div>
                                <div class="stat-label">Miembros máximo rango</div>
                            </div>
                        </div>
                    </div>
                `;
                
                membersContainer.innerHTML = membersHTML;
                
                // Añadir eventos de búsqueda
                const searchInput = membersContainer.querySelector('.members-search-input');
                const searchButton = membersContainer.querySelector('.search-btn');
                
                if (searchInput && searchButton) {
                    searchButton.addEventListener('click', () => {
                        this.playSound('click');
                        this.searchMembers(searchInput.value);
                    });
                    
                    searchInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            this.playSound('click');
                            this.searchMembers(searchInput.value);
                        }
                    });
                }
            }, 1000);
        }
    }
    
    /**
     * Obtener ícono de insignia activa
     * @returns {string} - Emoji o texto del ícono
     */
    getActiveBadgeIcon() {
        const activeBadgeId = this.getUserData('activeBadge');
        
        if (!activeBadgeId) return '';
        
        const userBadges = this.state.userBadges || [];
        const activeBadge = userBadges.find(badge => badge.id === activeBadgeId);
        
        return activeBadge ? activeBadge.icon : '';
    }
    
    /**
     * Buscar miembros
     * @param {string} query - Término de búsqueda
     */
    searchMembers(query) {
        // En producción, esto sería una llamada AJAX al backend
        this.showNotification('Búsqueda', `Buscando miembros por: ${query}`, 'info');
        
        // Como es solo una demo, no hacemos nada más
    }
    
    /**
     * Cargar datos secretos
     * @param {Object} dashboardWindow - Referencia a la ventana del panel
     */
    loadSecretData(dashboardWindow) {
        // Verificar que el usuario tiene rango suficiente
        if (!this.isHighRankMember()) {
            return;
        }
        
        const secretContainer = dashboardWindow.element.querySelector('.secret-container');
        
        if (secretContainer) {
            secretContainer.innerHTML = '<div class="loading-spinner">Cargando contenido secreto...</div>';
            
            // Simular carga de datos
            setTimeout(() => {
                // En producción, esto vendría del backend
                const secretHTML = `
                    <div class="secret-warning">
                        <div class="warning-icon">⚠️</div>
                        <div class="warning-text">
                            <p>Este contenido está reservado para miembros de alto rango de la secta.</p>
                            <p>No compartas esta información con nadie fuera de la secta Fashion Killer.</p>
                        </div>
                    </div>
                    
                    <div class="secret-sections">
                        <div class="secret-section">
                            <h3 class="section-title">Próximos Lanzamientos</h3>
                            <div class="section-content">
                                <p>Accede a información anticipada sobre las próximas colecciones de Trashgènero antes que nadie.</p>
                                <ul>
                                    <li>Colección "Digital Decay" - Junio 2025</li>
                                    <li>Colaboración especial con diseñador underground - Agosto 2025</li>
                                    <li>Línea exclusiva para miembros de la secta - Octubre 2025</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="secret-section">
                            <h3 class="section-title">Ubicaciones Secretas</h3>
                            <div class="section-content">
                                <p>Puntos de encuentro para rituales exclusivos de alto rango.</p>
                                <ul>
                                    <li>Bunker Subterráneo - Barcelona</li>
                                    <li>Fábrica Abandonada - Madrid</li>
                                    <li>Túneles Secretos - Valencia</li>
                                </ul>
                                <p class="location-note">Las coordenadas exactas se enviarán 24h antes de cada ritual.</p>
                            </div>
                        </div>
                        
                        <div class="secret-section adult-content">
                            <h3 class="section-title">Zona XXX</h3>
                            <div class="section-content">
                                <p>Contenido adulto exclusivo para miembros de alto rango.</p>
                                <button class="neon-button access-adult-content-btn">Acceder</button>
                                <p class="adult-note">Contenido para mayores de 18 años.</p>
                            </div>
                        </div>
                    </div>
                `;
                
                secretContainer.innerHTML = secretHTML;
                
                // Añadir eventos
                const adultButton = secretContainer.querySelector('.access-adult-content-btn');
                
                if (adultButton) {
                    adultButton.addEventListener('click', () => {
                        this.playSound('click');
                        this.showAdultContent();
                    });
                }
            }, 1500);
        }
    }
    
    /**
     * Mostrar contenido adulto
     */
    showAdultContent() {
        // Esto es solo una demo, en realidad no hay contenido adulto
        this.showNotification('Contenido adulto', 'Esta función está deshabilitada en la demo', 'warning');
        
        // Trigger de Easter Egg aleatorio
        this.triggerEasterEgg();
    }
    
    /**
     * Trigger de Easter Egg aleatorio
     */
    triggerEasterEgg() {
        // Seleccionar un Easter Egg aleatorio
        const easterEggs = this.assets.easterEggs;
        
        if (easterEggs.length > 0) {
            const easterEggIndex = Math.floor(Math.random() * easterEggs.length);
            const easterEggImage = this.getAssetPath('easter-eggs/' + easterEggs[easterEggIndex]);
            
            // Crear elemento para mostrar el Easter Egg
            const easterEggElement = document.createElement('div');
            easterEggElement.className = 'trash-easter-egg';
            easterEggElement.innerHTML = `<img src="${easterEggImage}" alt="Easter Egg">`;
            
            // Posicionar aleatoriamente en la pantalla
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            easterEggElement.style.left = `${Math.floor(Math.random() * (viewportWidth - 300))}px`;
            easterEggElement.style.top = `${Math.floor(Math.random() * (viewportHeight - 300))}px`;
            
            // Añadir al body
            document.body.appendChild(easterEggElement);
            
            // Reproducir sonido
            this.playSound('ritual');
            
            // Eliminar después de unos segundos
            setTimeout(() => {
                if (easterEggElement.parentNode) {
                    easterEggElement.classList.add('fade-out');
                    
                    setTimeout(() => {
                        if (easterEggElement.parentNode) {
                            easterEggElement.parentNode.removeChild(easterEggElement);
                        }
                    }, 500);
                }
            }, 3000);
        }
    }
    
    /**
     * Abrir contenido secreto (desde el escritorio)
     */
    openSecretContent() {
        // Verificar que el usuario tiene rango suficiente
        if (!this.isHighRankMember()) {
            this.showNotification('Acceso denegado', 'Necesitas ser de alto rango para acceder', 'error');
            return;
        }
        
        // Crear ventana
        this.openWindow({
            title: 'Contenido Secreto',
            icon: 'xxxFolder',
            content: `
                <div class="secret-content vhs-filter">
                    <div class="vhs-lines"></div>
                    <div class="vhs-noise"></div>
                    
                    <div class="secret-loading">Verificando identidad...</div>
                </div>
            `,
            width: 800,
            height: 600,
            resizable: true
        });
        
        // Simular verificación
        setTimeout(() => {
            // Cargar contenido secreto
            const secretContentElement = document.querySelector('.secret-content');
            
            if (secretContentElement) {
                const loadingElement = secretContentElement.querySelector('.secret-loading');
                
                if (loadingElement) {
                    loadingElement.remove();
                }
                
                secretContentElement.innerHTML += `
                    <div class="secret-warning">
                        <div class="warning-icon">⚠️</div>
                        <div class="warning-text">
                            <p>Este contenido está reservado para miembros de alto rango de la secta.</p>
                            <p>No compartas esta información con nadie fuera de la secta Fashion Killer.</p>
                        </div>
                    </div>
                    
                    <div class="secret-tabs">
                        <div class="tab active" data-tab="upcoming">Próximos Lanzamientos</div>
                        <div class="tab" data-tab="locations">Ubicaciones</div>
                        <div class="tab" data-tab="xxx">Zona XXX</div>
                    </div>
                    
                    <div class="secret-panels">
                        <div class="panel active" id="panel-upcoming">
                            <h3>Próximos Lanzamientos</h3>
                            <p>Accede a información anticipada sobre las próximas colecciones de Trashgènero antes que nadie.</p>
                            <ul>
                                <li>Colección "Digital Decay" - Junio 2025</li>
                                <li>Colaboración especial con diseñador underground - Agosto 2025</li>
                                <li>Línea exclusiva para miembros de la secta - Octubre 2025</li>
                            </ul>
                        </div>
                        
                        <div class="panel" id="panel-locations">
                            <h3>Ubicaciones Secretas</h3>
                            <p>Puntos de encuentro para rituales exclusivos de alto rango.</p>
                            <ul>
                                <li>Bunker Subterráneo - Barcelona</li>
                                <li>Fábrica Abandonada - Madrid</li>
                                <li>Túneles Secretos - Valencia</li>
                            </ul>
                            <p class="location-note">Las coordenadas exactas se enviarán 24h antes de cada ritual.</p>
                        </div>
                        
                        <div class="panel" id="panel-xxx">
                            <h3>Zona XXX</h3>
                            <p>Contenido adulto exclusivo para miembros de alto rango.</p>
                            <button class="neon-button access-adult-content-btn">Acceder</button>
                            <p class="adult-note">Contenido para mayores de 18 años.</p>
                        </div>
                    </div>
                `;
                
                // Configurar tabs
                const tabs = secretContentElement.querySelectorAll('.tab');
                const panels = secretContentElement.querySelectorAll('.panel');
                
                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        this.playSound('click');
                        
                        // Quitar clase activa
                        tabs.forEach(t => t.classList.remove('active'));
                        panels.forEach(p => p.classList.remove('active'));
                        
                        // Añadir clase activa
                        tab.classList.add('active');
                        const panelId = `panel-${tab.dataset.tab}`;
                        secretContentElement.querySelector(`#${panelId}`).classList.add('active');
                    });
                });
                
                // Configurar botón de contenido adulto
                const adultButton = secretContentElement.querySelector('.access-adult-content-btn');
                
                if (adultButton) {
                    adultButton.addEventListener('click', () => {
                        this.playSound('click');
                        this.showAdultContent();
                    });
                }
            }
        }, 2000);
    }
    
    /**
     * Unirse a la secta
     */
    joinSect() {
        // En producción, esto sería una llamada AJAX al backend
        
        // Simular éxito
        this.state.isSectMember = true;
        this.state.userRank = 'Novicix Normativo';
        this.state.userPoints = 0;
        this.state.userBadges = [
            {
                id: 'badge_initiate',
                icon: '⭐',
                title: 'Iniciado Fashion Killer',
                description: 'Has aceptado el juramento de la secta',
                color: '#ff00ff'
            }
        ];
        this.state.userMissions = [];
        this.state.userRituals = [];
        
        // Guardar en localStorage
        this.saveUserData('isSectMember', true);
        this.saveUserData('userRank', this.state.userRank);
        this.saveUserData('userPoints', this.state.userPoints);
        this.saveUserData('userBadges', this.state.userBadges);
        
        // Mostrar notificación
        this.showNotification('¡Bienvenido a la Secta!', 'Ahora eres un Novicix Normativo', 'ritual');
        
        // Trigger de Easter Egg
        this.triggerEasterEgg();
        
        // Actualizar la UI
        this.resetDesktopIcons();
        
        // Cerrar la ventana actual si existe
        const joinWindow = document.querySelector('.window-active');
        if (joinWindow) {
            const windowId = joinWindow.id;
            this.windowManager.closeWindow(windowId);
        }
        
        // Abrir el panel de la secta
        this.openSectDashboard();
    }
    
    /**
     * Resetear iconos del escritorio
     */
    resetDesktopIcons() {
        // Eliminar iconos actuales
        const desktop = this.elements.desktop;
        if (desktop) {
            desktop.innerHTML = '';
        }
        
        // Volver a cargar los iconos
        this.loadDesktopIcons();
    }
    
    /**
     * Añadir puntos al usuario
     * @param {number} points - Puntos a añadir
     */
    addUserPoints(points) {
        if (!this.state.userPoints) this.state.userPoints = 0;
        
        this.state.userPoints += points;
        
        // Guardar en localStorage
        this.saveUserData('userPoints', this.state.userPoints);
        
        // Actualizar UI si existe
        const userPointsElements = document.querySelectorAll('.user-points .points-value');
        userPointsElements.forEach(element => {
            element.textContent = this.state.userPoints;
        });
        
        // Actualizar barras de progreso
        const progressBars = document.querySelectorAll('.rank-progress .progress-fill');
        progressBars.forEach(bar => {
            bar.style.width = `${this.calculateRankProgress()}%`;
        });
        
        // Actualizar textos de progreso
        const progressTexts = document.querySelectorAll('.rank-progress .progress-text');
        progressTexts.forEach(text => {
            const nextRank = this.getNextRank();
            if (nextRank !== 'Rango máximo alcanzado') {
                text.textContent = `${this.getPointsNeededForNextRank()} puntos para ${nextRank}`;
            } else {
                text.textContent = '¡Has alcanzado el rango máximo!';
            }
        });
    }
    
    /**
     * Añadir una insignia al usuario
     * @param {Object} badge - Objeto con datos de la insignia
     */
    addUserBadge(badge) {
        if (!this.state.userBadges) this.state.userBadges = [];
        
        // Verificar que no existe ya
        const badgeExists = this.state.userBadges.some(b => b.id === badge.id);
        
        if (!badgeExists) {
            this.state.userBadges.push(badge);
            
            // Guardar en localStorage
            this.saveUserData('userBadges', this.state.userBadges);
        }
    }
    
    /**
     * Verificar si el usuario debe subir de rango
     */
    checkRankUp() {
        const ranks = [
            { name: 'Novicix Normativo', points: 0 },
            { name: 'Discípulx Kitsch', points: 100 },
            { name: 'Aprendiz Maricón', points: 500 },
            { name: 'Sacerdotx Provocativx', points: 1000 },
            { name: 'Obispx del Glitch', points: 2500 },
            { name: 'Cardenalx Irreverente', points: 5000 },
            { name: 'Sumo Pontífice Trash', points: 10000 }
        ];
        
        // Obtener rango actual
        const currentRankIndex = ranks.findIndex(r => r.name === this.state.userRank);
        
        if (currentRankIndex === -1 || currentRankIndex === ranks.length - 1) {
            return; // Rango no encontrado o ya es el máximo
        }
        
        // Verificar si puede subir de rango
        for (let i = currentRankIndex + 1; i < ranks.length; i++) {
            if (this.state.userPoints >= ranks[i].points) {
                // Subir de rango
                const newRank = ranks[i].name;
                this.state.userRank = newRank;
                
                // Guardar en localStorage
                this.saveUserData('userRank', newRank);
                
                // Actualizar UI
                const userRankElements = document.querySelectorAll('.user-rank .rank-name');
                userRankElements.forEach(element => {
                    element.textContent = newRank;
                });
                
                // Actualizar iconos de rango
                const rankIconElements = document.querySelectorAll('.user-rank .rank-icon');
                rankIconElements.forEach(element => {
                    element.textContent = this.getRankIcon(newRank);
                });
                
                // Mostrar notificación
                this.showNotification('¡Nuevo Rango!', `Has ascendido a ${newRank}`, 'ritual');
                
                // Trigger de Easter Egg
                this.triggerEasterEgg();
                
                // Añadir insignia de rango
                this.addUserBadge({
                    id: `badge_rank_${i}`,
                    icon: this.getRankIcon(newRank),
                    title: `Rango: ${newRank}`,
                    description: `Has alcanzado el rango de ${newRank}`,
                    color: '#ff00ff'
                });
                
                // Si sube a rango alto, actualizar la UI
                if (i >= 4) {
                    this.resetDesktopIcons();
                }
            } else {
                break; // No puede subir más
            }
        }
    }
    
    /**
     * Calcular porcentaje de progreso hacia el siguiente rango
     * @returns {number} - Porcentaje de progreso (0-100)
     */
    calculateRankProgress() {
        const nextRank = this.getNextRank();
        
        if (nextRank === 'Rango máximo alcanzado') {
            return 100;
        }
        
        const ranks = [
            { name: 'Novicix Normativo', points: 0 },
            { name: 'Discípulx Kitsch', points: 100 },
            { name: 'Aprendiz Maricón', points: 500 },
            { name: 'Sacerdotx Provocativx', points: 1000 },
            { name: 'Obispx del Glitch', points: 2500 },
            { name: 'Cardenalx Irreverente', points: 5000 },
            { name: 'Sumo Pontífice Trash', points: 10000 }
        ];
        
        // Obtener rango actual
        const currentRankIndex = ranks.findIndex(r => r.name === this.state.userRank);
        
        if (currentRankIndex === -1 || currentRankIndex === ranks.length - 1) {
            return 100; // Rango no encontrado o ya es el máximo
        }
        
        // Obtener puntos actuales
        const currentPoints = this.state.userPoints;
        
        // Obtener puntos necesarios para el siguiente rango
        const currentRankPoints = ranks[currentRankIndex].points;
        const nextRankPoints = ranks[currentRankIndex + 1].points;
        
        // Calcular progreso
        const pointsNeeded = nextRankPoints - currentRankPoints;
        const pointsGained = currentPoints - currentRankPoints;
        
        // Calcular porcentaje
        const percentage = (pointsGained / pointsNeeded) * 100;
        
        // Limitar a 0-100
        return Math.min(100, Math.max(0, percentage));
    }
    
    /**
     * Obtener el siguiente rango al que puede ascender el usuario
     * @returns {string} - Nombre del siguiente rango
     */
    getNextRank() {
        const ranks = [
            'Novicix Normativo',
            'Discípulx Kitsch',
            'Aprendiz Maricón',
            'Sacerdotx Provocativx',
            'Obispx del Glitch',
            'Cardenalx Irreverente',
            'Sumo Pontífice Trash'
        ];
        
        // Obtener índice del rango actual
        const currentRankIndex = ranks.indexOf(this.state.userRank);
        
        if (currentRankIndex === -1 || currentRankIndex === ranks.length - 1) {
            return 'Rango máximo alcanzado';
        }
        
        return ranks[currentRankIndex + 1];
    }
    
    /**
     * Obtener puntos necesarios para el siguiente rango
     * @returns {number} - Puntos restantes para subir de rango
     */
    getPointsNeededForNextRank() {
        const nextRank = this.getNextRank();
        
        if (nextRank === 'Rango máximo alcanzado') {
            return 0;
        }
        
        const rankPoints = {
            'Novicix Normativo': 0,
            'Discípulx Kitsch': 100,
            'Aprendiz Maricón': 500,
            'Sacerdotx Provocativx': 1000,
            'Obispx del Glitch': 2500,
            'Cardenalx Irreverente': 5000,
            'Sumo Pontífice Trash': 10000
        };
        
        const pointsNeeded = rankPoints[nextRank] - this.state.userPoints;
        
        return Math.max(0, pointsNeeded);
    }
    
    /**
     * Obtener ícono para un rango
     * @param {string} rank - Nombre del rango
     * @returns {string} - Emoji correspondiente al rango
     */
    getRankIcon(rank) {
        const rankIcons = {
            'Novicix Normativo': '⭐',
            'Discípulx Kitsch': '🌟',
            'Aprendiz Maricón': '💫',
            'Sacerdotx Provocativx': '✨',
            'Obispx del Glitch': '🔮',
            'Cardenalx Irreverente': '💎',
            'Sumo Pontífice Trash': '👑'
        };
        
        return rankIcons[rank] || '⭐';
    }
    
    /**
     * Verificar si el usuario es miembro de la secta
     * @returns {boolean} - True si es miembro
     */
    isSectMember() {
        return this.state.isSectMember;
    }
    
    /**
     * Verificar si el usuario es de alto rango
     * @returns {boolean} - True si es de alto rango
     */
    isHighRankMember() {
        const highRanks = [
            'Obispx del Glitch',
            'Cardenalx Irreverente',
            'Sumo Pontífice Trash'
        ];
        
        return highRanks.includes(this.state.userRank);
    }
    
    /**
     * Verificar si un usuario puede asistir a un ritual
     * @param {string} ritualId - ID del ritual
     * @returns {boolean} - True si puede asistir
     */
    canAttendRitual(ritualId) {
        // Verificar si el usuario tiene el rango necesario para el ritual
        const userRank = this.getUserRank();
        const ritualInfo = this.getRitualInfo(ritualId);
        if (!ritualInfo || !ritualInfo.requiredRank) return false;
        
        const ranks = [
            'Novicix Normativo',
            'Discípulx Kitsch',
            'Aprendiz Maricón',
            'Sacerdotx Provocativx',
            'Obispx del Glitch',
            'Cardenalx Irreverente',
            'Sumo Pontífice Trash'
        ];
        
        const userRankIndex = ranks.indexOf(userRank);
        const requiredRankIndex = ranks.indexOf(ritualInfo.requiredRank);
        
        return userRankIndex >= requiredRankIndex;
    }
    
    /**
     * Verificar si el usuario está confirmado para un ritual
     * @param {string} ritualId - ID del ritual
     * @returns {boolean} - True si está confirmado
     */
    isAttendingRitual(ritualId) {
        // Verificar si el usuario confirmó asistencia al ritual
        const userRituals = this.getUserRituals();
        return userRituals.some(r => r.id === ritualId && r.status === 'confirmed');
    }
    
    /**
     * Verificar si un ritual tiene fotos
     * @param {string} ritualId - ID del ritual
     * @returns {boolean} - True si tiene fotos
     */
    ritualHasPhotos(ritualId) {
        // Verificar si el ritual tiene fotos
        const ritualInfo = this.getRitualInfo(ritualId);
        return ritualInfo && ritualInfo.photos && ritualInfo.photos.length > 0;
    }
    
    /**
     * Verificar si un ritual tiene testimonios
     * @param {string} ritualId - ID del ritual
     * @returns {boolean} - True si tiene testimonios
     */
    ritualHasTestimonies(ritualId) {
        // Verificar si el ritual tiene testimonios
        const ritualInfo = this.getRitualInfo(ritualId);
        return ritualInfo && ritualInfo.testimonies && ritualInfo.testimonies.length > 0;
    }
    
    /**
     * Obtener información de un ritual
     * @param {string} ritualId - ID del ritual
     * @returns {Object|null} - Información del ritual o null si no existe
     */
    getRitualInfo(ritualId) {
        // Obtener información detallada de un ritual
        const rituals = this.state.rituals || [];
        return rituals.find(r => r.id === ritualId);
    }
    
    /**
     * Obtener lista de rituales del usuario
     * @returns {Array} - Lista de rituales
     */
    getUserRituals() {
        return this.state.userRituals || [];
    }
    
    /**
     * Obtener rango del usuario
     * @returns {string} - Nombre del rango
     */
    getUserRank() {
        return this.state.userRank;
    }
    
    /**
     * Obtener puntos del usuario
     * @returns {number} - Cantidad de puntos
     */
    getUserPoints() {
        return this.state.userPoints;
    }
    
    /**
     * Obtener insignias del usuario
     * @returns {Array} - Lista de insignias
     */
    getUserBadges() {
        return this.state.userBadges || [];
    }
    
    /**
     * Obtener puntos de bonificación por producto
     * @param {string} productId - ID del producto
     * @returns {number} - Puntos de bonificación
     */
    getProductBonus(productId) {
        // Obtener puntos de bonificación por producto
        const productBonuses = {
            // Mapeo entre ID de producto y puntos
            'product1': 10,
            'product2': 20,
            'product3': 30
        };
        
        return productBonuses[productId] || 5; // 5 puntos por defecto
    }
    
    /**
     * Verificar si un producto es exclusivo para la secta
     * @param {string} productId - ID del producto
     * @returns {boolean} - True si es exclusivo
     */
    isProductExclusive(productId) {
        // Verificar si un producto es exclusivo para la secta
        const exclusiveProducts = ['product5', 'product7', 'product9'];
        return exclusiveProducts.includes(productId);
    }
    
    /**
     * Obtener contenido exclusivo para producto según rango
     * @param {string} productId - ID del producto
     * @param {string} rank - Rango del usuario
     * @returns {string} - Contenido exclusivo
     */
    getProductExclusiveContent(productId, rank) {
        // Obtener contenido exclusivo para miembros según rango
        // En producción, usar API
        return "Contenido exclusivo para miembros con rango " + rank;
    }
    
    /**
     * Obtener multiplicador de puntos según rango
     * @param {string} rank - Nombre del rango
     * @returns {number} - Multiplicador de puntos
     */
    getPointsMultiplier(rank) {
        // Obtener multiplicador de puntos según rango
        const multipliers = {
            'Novicix Normativo': 1,
            'Discípulx Kitsch': 1.2,
            'Aprendiz Maricón': 1.5,
            'Sacerdotx Provocativx': 1.8,
            'Obispx del Glitch': 2,
            'Cardenalx Irreverente': 2.5,
            'Sumo Pontífice Trash': 3
        };
        
        return multipliers[rank] || 1;
    }
    
    /**
     * Obtener lista de misiones del usuario
     * @returns {Array} - Lista de misiones
     */
    getUserMissions() {
        return this.state.userMissions || [];
    }
    
    /**
     * Obtener información de un miembro
     * @param {string} userId - ID del usuario
     * @returns {Object} - Información del miembro
     */
    getMemberInfo(userId) {
        // Obtener información de un miembro
        // En producción, usar API
        return {
            name: 'Miembro #' + userId,
            rank: 'Novicix Normativo',
            points: 50
        };
    }
    
    /**
     * Obtener puntos necesarios para un rango
     * @param {string} rankName - Nombre del rango
     * @returns {number} - Puntos necesarios
     */
    getPointsNeededForRank(rankName) {
        // Obtener puntos necesarios para un rango específico
        const rankThresholds = {
            'Novicix Normativo': 0,
            'Discípulx Kitsch': 100,
            'Aprendiz Maricón': 500,
            'Sacerdotx Provocativx': 1000,
            'Obispx del Glitch': 2500,
            'Cardenalx Irreverente': 5000,
            'Sumo Pontífice Trash': 10000
        };
        
        return rankThresholds[rankName] || 0;
    }
    
    /**
     * Cargar datos del usuario desde localStorage
     */
    loadUserData() {
        try {
            // Cargar datos principales
            const isSectMember = localStorage.getItem('trashOS_isSectMember') === 'true';
            
            if (isSectMember) {
                this.state.isSectMember = true;
                this.state.userRank = JSON.parse(localStorage.getItem('trashOS_userRank')) || 'Novicix Normativo';
                this.state.userPoints = parseInt(localStorage.getItem('trashOS_userPoints')) || 0;
                this.state.userBadges = JSON.parse(localStorage.getItem('trashOS_userBadges')) || [];
                this.state.userMissions = JSON.parse(localStorage.getItem('trashOS_userMissions')) || [];
                this.state.userRituals = JSON.parse(localStorage.getItem('trashOS_userRituals')) || [];
            }
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
        }
    }
    
    /**
     * Obtener un dato del usuario
     * @param {string} key - Clave del dato
     * @returns {*} - Valor almacenado
     */
    getUserData(key) {
        try {
            const data = localStorage.getItem(`trashOS_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error al obtener ${key}:`, error);
            return null;
        }
    }
    
    /**
     * Guardar un dato del usuario
     * @param {string} key - Clave del dato
     * @param {*} value - Valor a guardar
     */
    saveUserData(key, value) {
        try {
            localStorage.setItem(`trashOS_${key}`, JSON.stringify(value));
        } catch (error) {
            console.error(`Error al guardar ${key}:`, error);
        }
    }
}

// Exportar clase
window.TrashOS = TrashOS;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global
    window.trashOS = new TrashOS();
});