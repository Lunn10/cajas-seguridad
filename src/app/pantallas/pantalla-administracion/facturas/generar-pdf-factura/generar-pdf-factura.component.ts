import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PageSize } from 'pdfmake/interfaces';
import { fondoPDF } from './../../../../../assets/img64/fondoPDF';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
/*pdfMake.fonts = {
  Montserrat: {
    normal: 'Montserrat-Thin.ttf'
  }
};*/

@Component({
  selector: 'app-generar-pdf-factura',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './generar-pdf-factura.component.html',
  styleUrl: './generar-pdf-factura.component.scss'
})
export class GenerarPdfFacturaComponent implements OnInit {
  tamañoPagina : PageSize = 'A4';

  constructor(
    private _route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      this.generarPDF(params['id']);
    })
  }

  generarPDF(numero : number) {
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
        { 
          text: 'A', 
          fontSize: 25,
          absolutePosition: { 
            x: 291, 
            y: 5
          }
        },
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
          },
          absolutePosition: { 
            x: 30, 
            y: 100 
          }
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
