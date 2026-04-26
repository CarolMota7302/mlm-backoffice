/* ═══════════════════════════════════════════════════════════
   SOLAR GD - SIDEBAR & NAVIGATION CONTROLLER
   ═══════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // ── Sidebar Toggle (mobile) ──
    const toggleBtn = document.querySelector('.topbar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            if (overlay) overlay.classList.toggle('show');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        });
    }

    // ── Submenu Toggle ──
    document.querySelectorAll('.nav-item.has-submenu > .nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            
            // Close other open submenus
            document.querySelectorAll('.nav-item.has-submenu.open').forEach(function(item) {
                if (item !== parent) {
                    item.classList.remove('open');
                }
            });
            
            parent.classList.toggle('open');
        });
    });

    // ── Auto-open active submenu ──
    document.querySelectorAll('.nav-submenu .nav-link.active').forEach(function(activeLink) {
        const parentItem = activeLink.closest('.nav-item.has-submenu');
        if (parentItem) {
            parentItem.classList.add('open');
        }
    });

    // ── Notification Dropdown ──
    document.querySelectorAll('.topbar-icon-btn[data-dropdown]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const target = document.querySelector(this.dataset.dropdown);
            if (target) {
                target.classList.toggle('show');
            }
            // Close others
            document.querySelectorAll('.dropdown-menu-custom.show').forEach(function(menu) {
                if (menu !== target) menu.classList.remove('show');
            });
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu-custom.show').forEach(function(menu) {
            menu.classList.remove('show');
        });
    });

    // ── Copy to Clipboard ──
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Link copiado com sucesso!', 'success');
        }).catch(function() {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('Link copiado com sucesso!', 'success');
        });
    };

    // ── Toast Notification ──
    window.showToast = function(message, type) {
        type = type || 'info';
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = 'toast-custom toast-' + type;
        toast.innerHTML = '<i class="fas ' + icons[type] + '"></i><span>' + message + '</span>';
        container.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, 3000);
    };

    // ── Password Toggle ──
    document.querySelectorAll('.input-toggle').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ── Confirm Modal ──
    window.showConfirm = function(title, message, callback) {
        const modal = document.getElementById('confirmModal');
        if (modal) {
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-body p').textContent = message;
            const confirmBtn = modal.querySelector('.btn-confirm-action');
            confirmBtn.onclick = function() {
                if (callback) callback();
                bootstrap.Modal.getInstance(modal).hide();
            };
            new bootstrap.Modal(modal).show();
        }
    };

})();