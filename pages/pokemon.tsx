import { GetServerSideProps } from 'next';
import Link from 'next/link';
import axios from 'axios';

import Layout from '../components/Layout';

interface IPokemonProps {
  pokemonData: {
    name: string;
    image: string;
    height: number;
    weight: number;
    types: {
      type: {
        name: string;
      };
    }[];
  }
};

const Pokemon = ({ pokemonData }: IPokemonProps) => {
  return (
    <Layout title={`Pokemon ${pokemonData.name}`}>
      <h1 className="text-4xl mb-2 text-center capitalize">
        {pokemonData.name}
      </h1>
      <img src={pokemonData.image} alt={pokemonData.name} className="mx-auto" />
      <p>
        <span className="font-bold mr-2">Height: </span>
        {pokemonData.height}
      </p>
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {pokemonData.weight}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokemonData.types.map((type, index) => (
        <p key={index}>
          {type.type.name}
        </p>
      ))}
      <p className="py-10 text-center">
        <Link href="/">
          <span className="text-purple-700 text-lg uppercase cursor-pointer">Home</span>
        </Link>
      </p>
    </Layout>
  );
}

interface IPokemonResponse {
  name: string;
  image: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string };

  try {
    const response = await axios
      .get<IPokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const paddedIndex = ('00' + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

    const pokemonData: IPokemonResponse = {
      name: response.data.name,
      image,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types,
    }

    return {
      props: { pokemonData },
    }
  } catch (err) {
    console.error(err);
  }
}

export default Pokemon;
