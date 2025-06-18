import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  usuariosFiltrados: any[] = [];
  usuariosPaginados: any[] = [];
  isLoading: boolean = false;

  filtro: string = '';
  paginaActual: number = 1;
  registrosPorPagina: number = 10;
  totalRegistros: number = 0;
  totalPaginas: number = 0;

  ordenActual: string = '';
  ordenDireccion: 'asc' | 'desc' = 'asc';

  showColumnasDropdown: boolean = false;
  showMostrarDropdown: boolean = false;

  // Alert properties
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'success';
  showAlert: boolean = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.usuariosFiltrados = [...data];
        this.totalRegistros = data.length;
        this.totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);
        this.actualizarPaginacion();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltro() {
    if (!this.filtro.trim()) {
      this.usuariosFiltrados = [...this.users];
    } else {
      const filtroLower = this.filtro.toLowerCase();
      this.usuariosFiltrados = this.users.filter(usuario =>
        (usuario.name && usuario.name.toLowerCase().includes(filtroLower)) ||
        (usuario.email && usuario.email.toLowerCase().includes(filtroLower))
      );
    }
    
    // Actualizar paginación
    this.totalRegistros = this.usuariosFiltrados.length;
    this.totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);
    this.paginaActual = 1; // Volver a la primera página
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = 1;
    }

    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fin);
  }

  irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarPaginacion();
    }
  }

  cambiarRegistrosPorPagina(cantidad: number) {
    this.registrosPorPagina = cantidad;
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);
    this.actualizarPaginacion();
    this.showMostrarDropdown = false;
  }

  get inicioRegistro(): number {
    return this.totalRegistros === 0 ? 0 : (this.paginaActual - 1) * this.registrosPorPagina + 1;
  }

  get finRegistro(): number {
    const fin = this.paginaActual * this.registrosPorPagina;
    return fin > this.totalRegistros ? this.totalRegistros : fin;
  }

  get paginasVisibles(): number[] {
    const paginas: number[] = [];
    const inicio = Math.max(1, this.paginaActual - 2);
    const fin = Math.min(this.totalPaginas, this.paginaActual + 2);

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  toggleColumnas() {
    this.showColumnasDropdown = !this.showColumnasDropdown;
    this.showMostrarDropdown = false;
  }

  toggleMostrar() {
    this.showMostrarDropdown = !this.showMostrarDropdown;
    this.showColumnasDropdown = false;
  }

  showAlertMessage(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    
    // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  exportPDF() {
    if (!this.usuariosFiltrados.length) {
      this.showAlertMessage('No hay datos para exportar', 'warning');
      return;
    }

    try {
      const doc = new jsPDF();
      
      // Configurar el título
      doc.setFontSize(16);
      doc.text('Lista de Usuarios', 14, 15);
      
      // Configurar la tabla
      const tableColumn = ['Nombre', 'Email', 'Fecha Registro', 'Último login'];
      const tableRows: any[] = [];
      
      // Llenar los datos
      this.usuariosFiltrados.forEach(user => {
        const userData = [
          user.name,
          user.email,
          new Date(user.date_joined).toLocaleString(),
          new Date(user.last_login).toLocaleString()
        ];
        tableRows.push(userData);
      });
      
      // Generar la tabla
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255
        }
      });
      
      // Guardar el PDF
      doc.save('usuarios.pdf');
      this.showAlertMessage('PDF exportado exitosamente', 'success');
    } catch (error) {
      this.showAlertMessage('Error al exportar PDF', 'error');
    }
  }

  exportExcel() {
    if (!this.usuariosFiltrados.length) {
      this.showAlertMessage('No hay datos para exportar', 'warning');
      return;
    }

    try {
      // Preparar los datos para Excel
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
        this.usuariosFiltrados.map(user => ({
          'Nombre': user.name,
          'Email': user.email,
          'Fecha Registro': new Date(user.date_joined).toLocaleString(),
          'Último login': new Date(user.last_login).toLocaleString()
        }))
      );

      // Creamos el libro 
      const workbook: XLSX.WorkBook = { 
        Sheets: { 'Usuarios': worksheet }, 
        SheetNames: ['Usuarios'] 
      };

      // Guardar el documento
      XLSX.writeFile(workbook, 'usuarios.xlsx');
      this.showAlertMessage('Excel exportado exitosamente', 'success');
    } catch (error) {
      this.showAlertMessage('Error al exportar Excel', 'error');
    }
  }

  print() {
    window.print();
  }

}
