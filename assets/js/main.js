/* ═══════════════════════════════════════════════════════════
   SOLAR GD - MAIN JS CONTROLLER
   ═══════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // ── Initialize Bootstrap Tooltips ──
    document.addEventListener('DOMContentLoaded', function() {
        // Tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(el) {
            return new bootstrap.Tooltip(el);
        });

        // DataTables init (if present)
        if (typeof $.fn.DataTable !== 'undefined') {
            $('.datatable').DataTable({
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json'
                },
                pageLength: 10,
                responsive: true,
                dom: '<"row align-items-center mb-3"<"col-sm-6"l><"col-sm-6"f>>t<"row align-items-center mt-3"<"col-sm-5"i><"col-sm-7"p>>',
                drawCallback: function() {
                    // Re-apply styles after draw
                    this.api().columns.adjust();
                }
            });
        }

        // Animate progress bars on page load
        document.querySelectorAll('.progress-bar[data-width]').forEach(function(bar) {
            setTimeout(function() {
                bar.style.width = bar.dataset.width + '%';
            }, 300);
        });

        // Tab functionality
        document.querySelectorAll('.nav-tabs-custom .nav-link').forEach(function(tab) {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const tabGroup = this.closest('.nav-tabs-custom');
                tabGroup.querySelectorAll('.nav-link').forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');

                const target = this.getAttribute('data-tab');
                if (target) {
                    const parent = this.closest('.card') || this.closest('.tab-parent');
                    if (parent) {
                        parent.querySelectorAll('.tab-pane').forEach(function(pane) {
                            pane.classList.remove('active');
                            pane.style.display = 'none';
                        });
                        const targetPane = parent.querySelector(target);
                        if (targetPane) {
                            targetPane.classList.add('active');
                            targetPane.style.display = 'block';
                        }
                    }
                }
            });
        });

        // Login form demo
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Entrando...';
                btn.disabled = true;
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1200);
            });
        }

        // Admin login form
        const adminLoginForm = document.getElementById('adminLoginForm');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Entrando...';
                btn.disabled = true;
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1200);
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Conta criada com sucesso! Redirecionando para pagamento...', 'success');
                const btn = this.querySelector('button[type="submit"]');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
                btn.disabled = true;
            });
        }

        // Saque form
        const saqueForm = document.getElementById('saqueForm');
        if (saqueForm) {
            const valorInput = saqueForm.querySelector('#valorSaque');
            if (valorInput) {
                valorInput.addEventListener('input', function() {
                    const valor = parseFloat(this.value) || 0;
                    const taxa = valor * 0.05;
                    const liquido = valor - taxa;
                    const taxaEl = document.getElementById('taxaCalc');
                    const liquidoEl = document.getElementById('liquidoCalc');
                    if (taxaEl) taxaEl.textContent = 'R$ ' + taxa.toFixed(2).replace('.', ',');
                    if (liquidoEl) liquidoEl.textContent = 'R$ ' + (liquido > 0 ? liquido : 0).toFixed(2).replace('.', ',');
                });
            }
        }

        // CPF Mask
        document.querySelectorAll('.mask-cpf').forEach(function(input) {
            input.addEventListener('input', function() {
                let v = this.value.replace(/\D/g, '');
                v = v.replace(/(\d{3})(\d)/, '\$1.\$2');
                v = v.replace(/(\d{3})(\d)/, '\$1.\$2');
                v = v.replace(/(\d{3})(\d{1,2})$/, '\$1-\$2');
                this.value = v;
            });
        });

        // Phone Mask
        document.querySelectorAll('.mask-phone').forEach(function(input) {
            input.addEventListener('input', function() {
                let v = this.value.replace(/\D/g, '');
                v = v.replace(/(\d{2})(\d)/, '(\$1) \$2');
                v = v.replace(/(\d{5})(\d)/, '\$1-\$2');
                this.value = v;
            });
        });

        // CEP Mask
        document.querySelectorAll('.mask-cep').forEach(function(input) {
            input.addEventListener('input', function() {
                let v = this.value.replace(/\D/g, '');
                v = v.replace(/(\d{5})(\d)/, '\$1-\$2');
                this.value = v;
            });
        });

        // Select All checkbox
        document.querySelectorAll('.select-all').forEach(function(cb) {
            cb.addEventListener('change', function() {
                const table = this.closest('table');
                if (table) {
                    table.querySelectorAll('.select-row').forEach(function(rowCb) {
                        rowCb.checked = cb.checked;
                    });
                }
                // Toggle bulk actions bar
                const bulkBar = document.querySelector('.bulk-actions-bar');
                if (bulkBar) {
                    const checked = document.querySelectorAll('.select-row:checked').length;
                    if (checked > 0) {
                        bulkBar.classList.add('show');
                        bulkBar.querySelector('.selected-count').textContent = checked;
                    } else {
                        bulkBar.classList.remove('show');
                    }
                }
            });
        });

    });

})();