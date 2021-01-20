import {GetStaticProps} from 'next/types'
import Link from 'next/link';
import axios from 'axios';

import Layout from '../components/Layout';

interface IHomeProps {
  pokemonData: {
    name: string;
    image: string;
    url: string;
  }[];
};

const Home = ({ pokemonData }: IHomeProps) => {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>

      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={pokemon.name}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <button className="flex items-center text-lg w-full bg-gray-200 hover:bg-gray-100 transition-colors duration-500 rounded-md border p-4 border-gray my-2 capitalize">
                <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mr-3" />
                <span className="mr-2 font-bold">{index + 1}</span>
                {pokemon.name}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
};

interface IPokedexResponse {
  results: {
    name: string;
    url: string;
  }[];
}

// EXECUTION ON SERVER
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await axios
      .get<IPokedexResponse>('https://pokeapi.co/api/v2/pokemon?limit=150');

    const pokemonData = response.data.results.map((data, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      
      return {
        ...data,
        image,
      }
    });

    return {
      props: { pokemonData },
    }
  } catch (err) {
    console.error(err);
  }
}

export default Home;