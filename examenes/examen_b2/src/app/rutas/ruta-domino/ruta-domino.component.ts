import { Component, OnInit } from '@angular/core';
import dominos from './../../data/dominos.json';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WebsocketsService } from 'src/app/services/websockets.service';
import { PiezasService } from 'src/app/services/piezas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruta-domino',
  templateUrl: './ruta-domino.component.html',
  styleUrls: ['./ruta-domino.component.scss']
})
export class RutaDominoComponent implements OnInit {
  logitud = 7
  public dominos: {
    id: string,
    valor: number,
    codigo: string,
  }[] = dominos
  nombre1 = "Esperando Jugador 1"
  nombre2 = "Esperando Jugador 2"
  sala = "sala1"
  paso = false
  pasoMessage = 'Paso'

  jugador1: any[] = []
  jugador2: any[] = []
  mesa: any[] = []
  turno = true

  constructor(
    private readonly websocketService: WebsocketsService,
    private readonly piezasService: PiezasService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.getParametros()
  }

  //obtener los parametros de la url
  getParametros() {
    this.activatedRoute.params.subscribe(
      (parametros: any) => {
        this.nombre1 = parametros.nombre
      }
    )
  }

  eventoIniciarJuego() {
    this.websocketService.ejecutarEventoIniciarJuego(this.sala, this.nombre1, this.jugador1, this.piezasService.arrayPiezas);
  }

  eventoJugar(pieza: number, pos: number) {
    this.turno = !this.turno
    this.websocketService.ejecutarEventoJugar(this.sala, this.nombre1, pieza, pos, this.jugador1, this.jugador2, this.mesa);
  }

  enviarPaso() {
    this.turno = !this.turno
    this.websocketService.ejecutarEventoPaso(this.sala, this.nombre1);
  }

  ngOnInit(): void {
    this.websocketService.ejecutarEventoEntrarASala(this.nombre1, this.sala);

    this.websocketService.escucharEventoIniciarJuego().subscribe(
      (data: any) => {
        console.log("data Iniciar juego: ", data)
        this.jugador2 = data.jugador
        this.nombre2 = data.nombre
        this.turno = data.nombre
        this.piezasService.arrayPiezas = data.piezas
        //this.reversarPiezaJugador(this.jugador2);
      }
    );
    this.websocketService.escucharEventoEntrarASala().subscribe(
      (data: any) => {
        console.log("data: ", data)
        this.nombre2 = data.nombre
      }
    );

    this.websocketService.escucharEventoJugar().subscribe(
      (data: any) => {
        console.log("jugar: ", data)
        this.mesa = data.mesa
        this.jugador1 = data.jugador2
        this.jugador2 = data.jugador1
        this.turno = true
        //this.ponerDeFrentePiezaJugador(this.jugador1);
        //this.reversarPiezaJugador(this.jugador2);
      })

    this.websocketService.escucharEventoPaso().subscribe(
      (data: any) => {
        console.log("paso: ", data)
        this.paso = true
        this.turno = !this.turno
        this.pasoMessage = data.message
        setTimeout(() => { this.paso = false, console.log("3 seconds") }, 3000)
      })
  }

  retirarPiezas() {
    this.sacarPiezas(this.jugador1);
    this.rotarPiezaJugador(this.jugador1);
    this.eventoIniciarJuego()
  }

  sacarPiezas(jugador: any[]) {
    while (jugador.length < this.logitud) {
      const num = this.getRandomInt(0, this.dominos.length);
      if (this.piezasService.arrayPiezas.indexOf(num) === -1) {
        this.piezasService.arrayPiezas.push(num);
        jugador.push(this.dominos[num]);
      } else {
        this.sacarPiezas(jugador);
      }
    }
  }

  rotarPiezaJugador(jugador: any[]) {
    jugador.forEach(pieza => {
      const pos = pieza.codigo.search("dominoDoble")
      if (pos === -1) {
        pieza.codigo = pieza.codigo.replaceAll("domino", "dominoDoble")
        pieza.codigo = pieza.codigo.replaceAll("carta-box", "carta-boxV")
      }
    })
  }

  reversarPiezaJugador(jugador: any[]) {
    jugador.forEach(pieza => {
      pieza.codigo = pieza.codigo.replaceAll("'carta'", "'carta reversoPieza'")
    })
  }

  ponerDeFrentePiezaJugador(jugador: any[]) {
    jugador.forEach(pieza => {
      pieza.codigo = pieza.codigo.replaceAll("reversoPieza", "")
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (this.turno) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        this.acoplarElemento(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      }
    } else {
      console.log(this.turno, this.nombre2)
      alert("Es el turno del jugador 2")
    }
  }

  acoplarElemento(previousData: any[], currentData: any[], previousDataIndex: number, currentDataIndex: number): boolean {
    if (currentData.length > 0) {
      const pieza1 = currentData[0]
      const indiceP2 = currentData.length
      const pieza2 = currentData[indiceP2 - 1]
      if (pieza1.id == pieza2.id) {
        const sp = pieza1.id.split('-')
        const p1 = sp[0]
        const p2 = sp[1]
        const spe = previousData[previousDataIndex].id.split('-')
        const pe1 = spe[0]
        const pe2 = spe[1]

        if (p1 == p2) {
          if (p1 == pe1) {
            previousData[previousDataIndex].ocupado = p1
            previousData[previousDataIndex].vacio = pe2

            console.log("Pieza a transferir:", previousData[previousDataIndex])

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              currentDataIndex
            );
            //currentData[0].ocupado = p1
            //currentData[0].vacio = p2

            if (currentDataIndex == 0) {
              currentData[0].codigo = currentData[0].codigo.replaceAll("dominoDoble", "domino piezaGirada")
              currentData[0].codigo = currentData[0].codigo.replaceAll("carta-boxV", "carta-box")
            }
            this.eventoJugar(previousDataIndex, 0)
          } else if (p1 == pe2) {
            previousData[previousDataIndex].ocupado = p1
            previousData[previousDataIndex].vacio = pe1

            console.log("Pieza a transferir:", previousData[previousDataIndex])

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              currentDataIndex
            );
            //currentData[0].ocupado = p1
            //currentData[0].vacio = p2

            if (currentDataIndex == currentData.length - 1) {
              currentData[currentData.length - 1].codigo = currentData[currentData.length - 1].codigo.replaceAll("dominoDoble", "domino piezaGirada")
              currentData[currentData.length - 1].codigo = currentData[currentData.length - 1].codigo.replaceAll("carta-boxV", "carta-box")

              this.eventoJugar(previousDataIndex, currentData.length - 1)
            } else {
              currentData[0].codigo = currentData[0].codigo.replaceAll("dominoDoble", "domino")
              currentData[0].codigo = currentData[0].codigo.replaceAll("carta-boxV", "carta-box")
              this.eventoJugar(previousDataIndex, 0)
            }
          }
        } else if (pe1 == pe2) {
          if (p1 == pe1) {
            previousData[previousDataIndex].ocupado = p1
            previousData[previousDataIndex].vacio = pe2

            console.log("Pieza a transferir:", previousData[previousDataIndex])

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              0
            );
            //currentData[0].ocupado = p1
            //currentData[0].vacio = p2

            this.eventoJugar(previousDataIndex, 0)
          } else if (p2 == pe1) {
            previousData[previousDataIndex].ocupado = p2
            previousData[previousDataIndex].vacio = pe1

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              1
            );
            //currentData[0].ocupado = p2
            //currentData[0].vacio = p1

            this.eventoJugar(previousDataIndex, 1)
          }
        } else {
          if (p1 == pe1 || p1 == pe2) {
            previousData[previousDataIndex].ocupado = p1
            previousData[previousDataIndex].vacio = pe2

            console.log("Pieza a transferir:", previousData[previousDataIndex])

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              0
            );
            //currentData[0].ocupado = p1
            //currentData[0].vacio = p2

            if (p1 == pe1) {
              currentData[0].codigo = currentData[0].codigo.replaceAll("dominoDoble", "domino piezaGirada")
              currentData[0].codigo = currentData[0].codigo.replaceAll("carta-boxV", "carta-box")
            }
            this.eventoJugar(previousDataIndex, 0)
            console.log('acoplado ', pieza1.id, "ocupado", p1)
          } else if (p2 == pe1 || p2 == pe2) {
            previousData[previousDataIndex].ocupado = p2
            previousData[previousDataIndex].vacio = pe1

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              1
            );
            //currentData[0].ocupado = p2
            //currentData[0].vacio = p1

            if (p2 == pe2) {
              currentData[1].codigo = currentData[1].codigo.replaceAll("dominoDoble", "domino piezaGirada")
              currentData[1].codigo = currentData[1].codigo.replaceAll("carta-boxV", "carta-box")
            }
            this.eventoJugar(previousDataIndex, 1)
            console.log('acoplado ', pieza1.id, "ocupado", p2)
          }
        }
      } else {

        const sp = pieza1.id.split('-')
        const p1 = sp[0]
        const p2 = sp[1]

        const sp2 = pieza2.id.split('-')
        const p21 = sp2[0]
        const p22 = sp2[1]

        const piezaActual = previousData[previousDataIndex]
        const spA = piezaActual.id.split('-')
        const pa1 = spA[0]
        const pa2 = spA[1]

        if (pa1 == pa2) {
          console.log("pieza entrante es doble")
          console.log(pieza1)
          console.log(pieza2)
          if (pa1 == pieza1.vacio) {
            previousData[previousDataIndex].ocupado = pa1
            previousData[previousDataIndex].vacio = pa2
            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              0
            );
            this.eventoJugar(previousDataIndex, 0)
            //currentData[0].ocupado = pa1
            //currentData[0].vacio = pa1
          } else if (pa1 == pieza2.vacio) {
            previousData[previousDataIndex].ocupado = pa1
            previousData[previousDataIndex].vacio = pa2
            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              indiceP2
            );
            this.eventoJugar(previousDataIndex, indiceP2)
            //currentData[0].ocupado = pa1
            //currentData[0].vacio = pa1

          }
        } else {
          console.log("pieza entrante es normal")
          console.log(pieza1)
          console.log(pieza2)
          console.log(piezaActual)
          /*if (p1 == p2) {
            console.log("pieza1 es doble")
            if ((p1 == pa1 && p22 == pa2) || (p1 == pa2 && p22 == pa1)) {
              if (currentDataIndex == 0 || currentDataIndex == indiceP2) {
                this.procesarPieza(pieza2, previousData, currentData, previousDataIndex, currentDataIndex, currentDataIndex)
              } else {
                this.procesarPieza(pieza1, previousData, currentData, previousDataIndex, currentDataIndex, 0)
              }
            }
          } else if (p21 == p22) {
            console.log("pieza2 es doble")
            if ((p21 == pa1 && p2 == pa2) || (p21 == pa2 && p2 == pa1)) {
              if (currentDataIndex == 0 || currentDataIndex == indiceP2) {
                this.procesarPieza(pieza2, previousData, currentData, previousDataIndex, currentDataIndex, currentDataIndex)
              } else {
                this.procesarPieza(pieza1, previousData, currentData, previousDataIndex, currentDataIndex, 0)
              }
            }
          } else {*/
          if (pieza1.vacio == pa1) {
            console.log("pieza1 en el punto 1 es posible")

            previousData[previousDataIndex].ocupado = pa1
            previousData[previousDataIndex].vacio = pa2

            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              0
            );
            //currentData[0].ocupado = pa1
            //currentData[0].vacio = pa1

            currentData[0].codigo = currentData[0].codigo.replaceAll("dominoDoble", "domino piezaGirada")
            currentData[0].codigo = currentData[0].codigo.replaceAll("carta-boxV", "carta-box")
            this.eventoJugar(previousDataIndex, 0)
          }
          else if (pieza1.vacio == pa2) {
            console.log("pieza1 en punto 2 es posible")
            previousData[previousDataIndex].ocupado = pa2
            previousData[previousDataIndex].vacio = pa1
            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              0
            );
            //currentData[0].ocupado = pa1
            //currentData[0].vacio = pa1

            currentData[0].codigo = currentData[0].codigo.replaceAll("dominoDoble", "domino")
            currentData[0].codigo = currentData[0].codigo.replaceAll("carta-boxV", "carta-box")
            this.eventoJugar(previousDataIndex, 0)
          } else if (pieza2.vacio == pa1) {
            console.log("pieza2 en punto 1 es posible")

            previousData[previousDataIndex].ocupado = pa1
            previousData[previousDataIndex].vacio = pa2
            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              indiceP2
            );
            //currentData[indiceP2].ocupado = pa1
            //currentData[indiceP2].vacio = pa1

            currentData[indiceP2].codigo = currentData[indiceP2].codigo.replaceAll("dominoDoble", "domino")
            currentData[indiceP2].codigo = currentData[indiceP2].codigo.replaceAll("carta-boxV", "carta-box")
            this.eventoJugar(previousDataIndex, indiceP2)
          } else if (pieza2.vacio == pa2) {
            console.log("pieza2 en punto 2 es posible")
            previousData[previousDataIndex].ocupado = pa2
            previousData[previousDataIndex].vacio = pa1
            transferArrayItem(
              previousData,
              currentData,
              previousDataIndex,
              indiceP2
            );
            //currentData[indiceP2].ocupado = pa1
            //currentData[indiceP2].vacio = pa1

            currentData[indiceP2].codigo = currentData[indiceP2].codigo.replaceAll("dominoDoble", "domino piezaGirada")
            currentData[indiceP2].codigo = currentData[indiceP2].codigo.replaceAll("carta-boxV", "carta-box")
            this.eventoJugar(previousDataIndex, indiceP2)
          }

          /*if (pieza1.ocupado == p1 && pieza2.ocupado == p21) {
            if ((p2 == pa1 && p22 == pa2) || (p1 == pa2 && p22 == pa1)) {
              if (currentDataIndex == 0 || currentDataIndex == indiceP2) {
                this.procesarPieza(pieza2, previousData, currentData, previousDataIndex, currentDataIndex, currentDataIndex)
              } else {
                this.procesarPieza(pieza1, previousData, currentData, previousDataIndex, currentDataIndex, 0)
              }

            } else if (pieza1.ocupado == p1 && pieza2.ocupado == p21) {
              if ((p2 == pa1 && p22 == pa2) || (p1 == pa2 && p22 == pa1)) {
                if (currentDataIndex == 0 || currentDataIndex == indiceP2) {
                  this.procesarPieza(pieza2, previousData, currentData, previousDataIndex, currentDataIndex, currentDataIndex)
                } else {
                  this.procesarPieza(pieza1, previousData, currentData, previousDataIndex, currentDataIndex, 0)
                }
              }
            }
          }*/
          //}
        }
      }
      return false
    } else {
      const s = previousData[previousDataIndex].id.split('-')
      const p1 = s[0]
      const p2 = s[1]
      previousData[previousDataIndex].vacio = p1

      transferArrayItem(
        previousData,
        currentData,
        previousDataIndex,
        currentDataIndex
      );
      //console.log(this.jugador1, this.jugador2, this.mesa)

      if (p1 !== p2) {
        currentData[0].codigo = currentData[0].codigo.replaceAll("dominoDoble", "domino");
        currentData[0].codigo = currentData[0].codigo.replaceAll("carta-boxV", "carta-box")
      }
      this.eventoJugar(previousDataIndex, 0)
      return true
    }
  }

  private girarPiezaDoble(currentData: any[], currentDataIndex: number) {
    currentData[currentDataIndex].codigo = currentData[currentDataIndex].codigo.replace("domino", "dominoDoble");
    currentData[currentDataIndex].codigo = currentData[currentDataIndex].codigo.replace("carta-box", "carta-boxV");
  }

  procesarPieza(pieza: any, previousData: any[], currentData: any[], previousDataIndex: number, currentDataIndex: number, indice: number) {
    console.log("procesando...", pieza)
    const s = pieza.id.split('-')
    const p1 = s[0]
    const p2 = s[1]

    const spe = previousData[previousDataIndex].id.split('-')
    const pe1 = spe[0]
    const pe2 = spe[1]

    if (p1 == p2) {
      if (p1 == pe1 || p1 == pe2) {
        previousData[previousDataIndex].ocupado = p1
        previousData[previousDataIndex].vacio = pe2
        currentData[0].ocupado = p1
        currentData[0].vacio = p2
        transferArrayItem(
          previousData,
          currentData,
          previousDataIndex,
          indice
        );
        if (p1 == pe1) {
          currentData[indice].codigo = currentData[indice].codigo.replaceAll("dominoDoble", "domino piezaGirada")
          currentData[indice].codigo = currentData[indice].codigo.replaceAll("carta-boxV", "carta-box")
        }
        console.log(this.mesa, this.jugador1, this.jugador2)
        this.eventoJugar(previousDataIndex, indice)
        return true
      }
      return false
    } else {
      if (pieza.ocupado == p1) {
        if (p2 == pe1 || p2 == pe2) {
          previousData[previousDataIndex].ocupado = p2
          previousData[previousDataIndex].vacio = pe1
          currentData[0].ocupado = p2
          currentData[0].vacio = p1
          transferArrayItem(
            previousData,
            currentData,
            previousDataIndex,
            indice
          );

          if (p2 == pe2) {
            if (indice == 0) {
              const pos = currentData[indice + 1].codigo.search("piezaGirada")
              console.log("pos1", pos)
              console.log("codigo", currentData[indice + 1].codigo)
              if (pos < 0) {
                currentData[indice + 1].codigo = currentData[indice + 1].codigo.replaceAll("dominoDoble", "domino piezaGirada")
                currentData[indice].codigo = currentData[indice].codigo.replaceAll("carta-boxV", "carta-box")
              } else {
                console.log("ya esta girada")
              }
            } else {
              const pos = currentData[indice - 1].codigo.search("piezaGirada")
              console.log("pos1", pos)
              console.log("codigo", currentData[indice - 1].codigo)
              if (pos < 0) {
                currentData[indice - 1].codigo = currentData[indice - 1].codigo.replaceAll("dominoDoble", "domino piezaGirada")
                currentData[indice].codigo = currentData[indice].codigo.replaceAll("carta-boxV", "carta-box")
              } else {
                console.log("ya esta girada")
              }
            }
          }

          if (pe1 == pe2) {
            currentData[indice].codigo = currentData[indice].codigo.replace("domino", "dominoDoble")
            currentData[indice].codigo = currentData[indice].codigo.replace("carta-box", "carta-boxV")
          }
          this.eventoJugar(previousDataIndex, indice)
          return true
        }
        return false
      } else if (pieza.ocupado == p2) {
        if (p1 == pe1 || p1 == pe2) {
          previousData[previousDataIndex].ocupado = p1
          previousData[previousDataIndex].vacio = pe2
          currentData[0].ocupado = p1
          currentData[0].vacio = p2
          transferArrayItem(
            previousData,
            currentData,
            previousDataIndex,
            indice
          );
          if (p1 == pe1) {
            const pos = currentData[indice].codigo.search("piezaGirada")
            console.log("pos2", pos)
            console.log("codigo", currentData[indice].codigo)
            if (pos < 0) {
              currentData[indice].codigo = currentData[indice].codigo.replaceAll("dominoDoble", "domino piezaGirada")
              currentData[indice].codigo = currentData[indice].codigo.replaceAll("carta-boxV", "carta-box")
            } else {
              console.log("ya esta girada")
            }
          }
          this.eventoJugar(previousDataIndex, indice)
          return true
        }
        return false
      }
    }
    return false
  }

  verificarAcoplamiento(p1: string, p2: string, jugador: any[]) {
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  sacarAleatorio(p1: string, p2: string, mano: any[]) {

    const posibles = mano.filter(
      (pieza) => pieza.id.toLowerCase().includes(p1.toLowerCase() || p2.toLowerCase())
    )

    const num = this.getRandomInt(0, posibles.length)
    console.log(posibles[num])
    return posibles[num]
  }


}
