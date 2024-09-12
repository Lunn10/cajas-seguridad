import { Component } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-pdf-factura',
  standalone: true,
  imports: [],
  templateUrl: './generar-pdf-factura.component.html',
  styleUrl: './generar-pdf-factura.component.scss'
})
export class GenerarPdfFacturaComponent {
  generarPDF() {
    const documentDefinition = {
      content: [
        { text: 'Hola nomás', fontSize: 22, bold: true }
      ]
    };

      pdfMake.createPdf(documentDefinition).download('hola-nomas.pdf');
    }
  }
