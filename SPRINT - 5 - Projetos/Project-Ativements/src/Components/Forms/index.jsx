import React, { useContext, useEffect, useState } from "react";
import { Input, Select } from "../Input";
import { Button, ButtonTransparent } from "../Button";
import context from "../../Context/userContext";
import { v4 as uuid } from "uuid";

export const FormAccess = ({ textButton, value, onChange, onSubmit, load }) => {
  return (
    <form onSubmit={onSubmit} className="w-[45%]">
      <Input id="camporegistro" value={value} onChange={onChange}>
        Usuário de acesso
      </Input>
      <Button load={load} styles="w-full mt-3">
        {textButton}
      </Button>
    </form>
  );
};

export const FormAtivement = ({ list, setList, places, setPlaces, update }) => {
  const { user } = useContext(context);

  const [ativement, setAtivement] = useState({
    nome: "",
    numero: "",
    local: "",
  });

  //Quando houver uma mudança nos dados do update, vamos passar os valores para o ativement
  useEffect(() => {
    
    const local = places.filter((x) => x.id === update.local)

    if (local[0]) {
      //o local = filtro de locais com o id do local do ativo a ser atualizado, onde retornamos somente o nome
      setAtivement({
        ...update, local : local[0].nome});
    }
  }, [update]);

  const clearInput = () => {
    setAtivement({nome: "", numero: "", local: ""})
  }

  const updateAtivement = async () => {
    try {

        //Procurar pelo local informado
        const localId = await findLocal(ativement.local)

        const data = {
            ...ativement,
            local : localId,
            dataAlteracao: new Date().toLocaleString,
            usuarioAlteracao : user.id
        }

        fetch("http://localhost:3000/ativos/" + ativement.id, {
            method: "PUT",
            body: JSON.stringify(data)
        })

        //Atualizar na lista de vizualização os dados do ativo
        setList(list.map(item => item.id === ativement.id ? data : item))
        
    } catch (error) {
        alert("Não foi possivel atualizar os dados do ativo")
    }
  }

  const validateData = async (e) => {
    e.preventDefault();

    // Armazenando a validacao do numero do ativo
    const numeroEmUso = await validateNumberAtivement();

    // Verificar se os campos estão vazios (mesmo com espacos)
    if (ativement.nome.trim() == "" || ativement.local.trim() == "") {
      alert("Campos em branco, favor preenche-los");
    } else if (ativement.numero.length != 7) {
      // Limite de caracteres para o numero do ativo == 7
      alert("Numeração do ativo com tamanho inválido, favor utilizar somente 7 caracteres");
    } else if (ativement.nome.length < 2) {
      // Limite de caracteres para o nome do ativo > 2
      alert(
        "Nome do ativo com poucos caracteres, informar ao menos 2 caracteres"
      );
    } else if (/[!@#\$%\^\&*\)\(+=._-]+/.test(ativement.nome)) {
      // Verificar se o item contem caracteres especiais
      alert("O nome não podem conter caracteres especiais");
    } else if (/[^\w\s]+/g.test(ativement.local)) {
      // Verificar se o item contem caracteres especiaisf
      alert("O local não podem conter caracteres especiais");
    } else if (numeroEmUso && !ativement.id) {
      // Verificar se o numero do ativo já existe e não estou alterando o meu ativo
      alert("O número do ativo já está cadastrado, informe outro número");
    } else {
        if (!ativement.id) {
            //Senão existir o id ativo, ele cadastra
            createAtivement();
        }else{
            //Se houver, ele atualiza
            updateAtivement();
        }
    }
  };

  const validateNumberAtivement = () => {
    return fetch("http://localhost:3000/ativos?numero=" + ativement.numero)
      .then((response) => response.json())
      .then((response) => {
        if (response[0]) {
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  };

  const createAtivement = async (event) => {

    //validar se o local existe ou precisa cadastrar
    const localId = await findLocal(ativement.local);

    try {
      const data = {
        ...ativement,
        local: localId,
        id: uuid(),
        dataRegistro: new Date().toLocaleString(),
        usuario_id: user.id,
        status: true,
      };

      fetch("http://localhost:3000/ativos", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setList([...list, data]);
    } catch (error) {
      alert("Não foi possivel registrar o ativo");
    }
  };

  const findLocal = (local) => {
    return fetch("http://localhost:3000/locais?nome=" + local)
      .then((response) => response.json())
      .then(async (response) => {
        //Se não tiver um item no banco, registrar um novo local
        if (response.length === 0) {
          return await createLocal(local);
        } else {
          //Caso ele exist, retorne o id do local
          return response[0].id;
        }
      })
      .catch(() => {
        alert("Não foi possivel registrar um novo local");
      });
  };

  const createLocal = (local) => {
    try {
      const data = {
        id: uuid(),
        nome: local,
      };

      fetch("http://localhost:3000/locais", {
        method: "POST",
        body: JSON.stringify(data),
      });

      //Inseri nas tabs um novo local cadastrado
      setPlaces([...places, data]);

      return data.id;
    } catch (error) {
      alert("Não foi possivel registrar um novo local");
    }
  };

  return (
    <form
      onSubmit={validateData}
      className="bg-[#d9d3f6] w-full py-5 px-10 mt-6 rounded flex justify-around items-end shadow-md"
    >
      <Input
        disabled={!!ativement.id}
        type="number"
        value={ativement.numero}
        onChange={(e) => setAtivement({ ...ativement, numero: e.target.value })}
        styles="w-[20%]"
        id="numeroativo"
      >
        Número do ativo
      </Input>
      <Input
        type="text"
        value={ativement.nome}
        onChange={(e) => setAtivement({ ...ativement, nome: e.target.value })}
        styles="w-[20%]"
        id="nomeativo"
      >
        Nome do ativo
      </Input>
      <Select
        places={places}
        value={ativement.local}
        onChange={(e) => setAtivement({ ...ativement, local: e.target.value })}
        styles="w-[20%]"
        id="localativo"
      >
        Local do ativo
      </Select>

      <ButtonTransparent onClick={clearInput} styles="w-[15%] text-primary-blue border-primary-blue">
        Limpar campos
      </ButtonTransparent>

      <Button styles="w-[15%] justify-center items-center">
        Inserir ativo
      </Button>
    </form>
  );
};
