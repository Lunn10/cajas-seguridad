import { Component, OnInit, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PageSize } from 'pdfmake/interfaces';
import { fondoPDF } from './../../../../../assets/img64/fondoPDF';
import { ActivatedRoute } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
/*pdfMake.fonts = {
  Montserrat: {
    normal: 'Montserrat-Thin.ttf'
  }
};*/

@Component({
  selector: 'app-generar-pdf-factura',
  standalone: true,
  imports: [],
  templateUrl: './generar-pdf-factura.component.html',
  styleUrl: './generar-pdf-factura.component.scss'
})
export class GenerarPdfFacturaComponent implements OnInit {
  tamañoPagina : PageSize = 'A4';
  @ViewChild('content', { static: false }) content : any;

  constructor(
    private _route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      if(params['id']) {
        this.obtenerFactura(params['id']);
      }
    })
  }

  obtenerFactura(idFactura : Number) {
    this.generarPDFFactura();
  }

  generarPDFFactura() {
    // instalar html2canvas
    
    /*html2canvas(this.content.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('factura.pdf');
    });*/
  }

  generarPDF() {
    const documentDefinition = {
      pageSize: this.tamañoPagina,
      PageOrientation: 'landscape',
      background: [
        {
          image: fondoPDF,
          width: 595.28, 
          height: 841.89,
        }
      ],
      defaultStyle: {
        font: 'Roboto'
      },
      content: [
        { text: 'Hola, este es un PDF predefinido!', fontSize: 10 },
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                'asd',
                'aasd',
                'asda'
              ]
            ]
          }
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).open();

    /*
    pdfMake.createPdf(documentDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    });*/
  }
}
