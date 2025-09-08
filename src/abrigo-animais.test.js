import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  
  // Novos testes

  test("Gato não deve ser adotado se brinquedo já foi usado (gatos não dividem brinquedos)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("SKATE,RATO,BOLA", "BOLA,LASER", "Loco,Zero");
    expect(resultado.lista).toEqual(
      expect.arrayContaining([
        "Loco - pessoa 1",
        "Zero - abrigo",
      ])
    );
  });

  test("Animal deve ficar no abrigo se usar brinquedo de gato adotado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("RATO,SKATE", "RATO,BOLA", "Zero,Loco");
    expect(resultado.lista).toEqual(
      expect.arrayContaining([
        "Loco - abrigo",
        "Zero - pessoa 2",
      ])
    );
  });
  
  test("Animal deve ficar no abrigo se as duas pessoas puderem adotar", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("CAIXA,RATO,NOVELO", "CAIXA,NOVELO", "Bebe,Bola");
    expect(resultado.lista).toEqual(["Bebe - abrigo", "Bola - abrigo"]);
  });

  test("Animal deve ficar no abrigo se pessoa já adotou 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("BOLA", "LASER,RATO,BOLA,CAIXA,NOVELO,SKATE", "Rex,Bebe,Bola,Loco");
    expect(resultado.lista).toEqual(
      expect.arrayContaining([
        "Bebe - pessoa 2",
        "Bola - pessoa 2",
        "Loco - abrigo",
        "Rex - pessoa 2",
      ])
    );
  });

  test("Loco deve ser adotado se tiver companhia (ordem ignorada)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("RATO,BOLA,SKATE", "NOVELO,CAIXA", "Rex,Loco");
    expect(resultado.lista).toEqual(
      expect.arrayContaining([
        "Loco - pessoa 1",
        "Rex - pessoa 1",
      ])
    );
  });

  test("Loco deve ficar no abrigo se não tiver companhia e ordem errada", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("RATO,SKATE", "RATO,BOLA", "Zero,Loco");
    expect(resultado.lista).toEqual(
      expect.arrayContaining([
        "Loco - abrigo",
        "Zero - pessoa 2",
      ])
    );
  });

  test("Deve rejeitar parâmetros não string", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(123, "RATO,BOLA", "Rex");
    expect(resultado.erro).toBe("Entrada inválida. Os parâmetros devem ser textos com itens separados por vírgula.");
  });

  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("CAIXA,RATO", "RATO,BOLA", "Lulu");
    expect(resultado.erro).toBe("Animal inválido");
  });

  test("Deve rejeitar animal duplicado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("BOLA,LASER", "CAIXA,NOVELO", "Mimi,Mimi");
    expect(resultado.erro).toBe("Animal inválido");
  });

  test("Deve rejeitar brinquedo duplicado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("LASER,BOLA,RATO,LASER", "RATO,CAIXA", "Fofo,Bola");
    expect(resultado.erro).toBe("Brinquedo inválido");
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("LASER,BOLA,RATO", "PEIXE,RATO", "Fofo,Bola");
    expect(resultado.erro).toBe("Brinquedo inválido");
  });

  test("Deve rejeitar quando uma pessoa tenta adotar mais de 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("RATO,BOLA,SKATE,NOVELO,CAIXA,LASER", "RATO,BOLA", "Rex,Mimi,Fofo,Zero,Bola");
    const adotadosPessoa1 = resultado.lista.filter(x => x.includes("pessoa 1"));
    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
  });

  test("Deve rejeitar gato que compartilha brinquedo já adotado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("RATO,BOLA,LASER", "RATO,NOVELO", "Mimi,Fofo");
    expect(resultado.lista).toEqual(
      expect.arrayContaining([
        "Mimi - pessoa 1",
        "Fofo - abrigo",
      ])
    );
  });


});
