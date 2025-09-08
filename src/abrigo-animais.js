class AbrigoAnimais {
  constructor() {
    this.animais = {
      'Rex': { especie: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { especie: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { especie: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };

    this.brinquedosValidos = new Set();
    for (const animal in this.animais) {
      this.animais[animal].brinquedos.forEach(b => this.brinquedosValidos.add(b));
    }
  }

  validarAnimais(animaisArray) {
    if (new Set(animaisArray).size !== animaisArray.length) return false;
    for (const nome of animaisArray) {
      if (!this.animais[nome]) return false;
    }
    return true;
  }

  validarBrinquedos(brinquedosArray) {
    if (new Set(brinquedosArray).size !== brinquedosArray.length) return false;
    if (brinquedosArray.some(b => !this.brinquedosValidos.has(b))) return false;
    return true;
  }


  validarSequenciaBrinquedos(sequenciaNecessaria, brinquedosPessoa) {
    let indiceNecessario = 0;
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedo === sequenciaNecessaria[indiceNecessario]) {
        indiceNecessario++;
        if (indiceNecessario === sequenciaNecessaria.length) return true;
      }
    }
    return false;
  }

  possuiTodosBrinquedos(necessarios, brinquedosPessoa) {
    return necessarios.every(b => brinquedosPessoa.includes(b));
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    if (typeof brinquedosPessoa1 !== 'string' ||
      typeof brinquedosPessoa2 !== 'string' ||
      typeof ordemAnimais !== 'string') {
      return { erro: 'Entrada inválida. Os parâmetros devem ser textos com itens separados por vírgula.' };
    }


    const arrayBrinquedosPessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
    const arrayBrinquedosPessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
    const arrayOrdemAnimais = ordemAnimais.split(",").map(a => a.trim());


    if (!this.validarAnimais(arrayOrdemAnimais)) {
      return { erro: 'Animal inválido' };
    }


    if (!this.validarBrinquedos(arrayBrinquedosPessoa1) ||
      !this.validarBrinquedos(arrayBrinquedosPessoa2)) {
      return { erro: 'Brinquedo inválido' };
    }


    const resultado = [];
    const animaisAdotadosPessoa1 = [];
    const animaisAdotadosPessoa2 = [];
    const brinquedosUsadosPessoa1 = new Set();
    const brinquedosUsadosPessoa2 = new Set();

    for (const nomeAnimal of arrayOrdemAnimais) {
      const animal = this.animais[nomeAnimal];
      let adotadoPor = 'abrigo';


      let pessoa1PodeAdotar = animaisAdotadosPessoa1.length < 3 &&
        this.validarSequenciaBrinquedos(animal.brinquedos, arrayBrinquedosPessoa1);
      let pessoa2PodeAdotar = animaisAdotadosPessoa2.length < 3 &&
        this.validarSequenciaBrinquedos(animal.brinquedos, arrayBrinquedosPessoa2);


      if (nomeAnimal === 'Loco') {
        if (animaisAdotadosPessoa1.length > 0) {
          pessoa1PodeAdotar = this.possuiTodosBrinquedos(animal.brinquedos, arrayBrinquedosPessoa1);
        }
        if (animaisAdotadosPessoa2.length > 0) {
          pessoa2PodeAdotar = this.possuiTodosBrinquedos(animal.brinquedos, arrayBrinquedosPessoa2);
        }
      }

      if (animal.especie === 'gato') {
        pessoa1PodeAdotar = pessoa1PodeAdotar &&
          !animal.brinquedos.some(b => brinquedosUsadosPessoa1.has(b));
        pessoa2PodeAdotar = pessoa2PodeAdotar &&
          !animal.brinquedos.some(b => brinquedosUsadosPessoa2.has(b));
      }

      if (pessoa1PodeAdotar && animaisAdotadosPessoa1.length < 3 && 
          (!pessoa2PodeAdotar || animaisAdotadosPessoa2.length >= 3)) {
        adotadoPor = 'pessoa 1';
        animaisAdotadosPessoa1.push(nomeAnimal);
        animal.brinquedos.forEach(b => brinquedosUsadosPessoa1.add(b));
      } else if (pessoa2PodeAdotar && animaisAdotadosPessoa2.length < 3 && 
                 (!pessoa1PodeAdotar || animaisAdotadosPessoa1.length >= 3)) {
        adotadoPor = 'pessoa 2';
        animaisAdotadosPessoa2.push(nomeAnimal);
        animal.brinquedos.forEach(b => brinquedosUsadosPessoa2.add(b));
      }

      resultado.push(`${nomeAnimal} - ${adotadoPor}`);
    }

    resultado.sort((a, b) =>
      a.split(" - ")[0].localeCompare(b.split(" - ")[0])
    );

    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
