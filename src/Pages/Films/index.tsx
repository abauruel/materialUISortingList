import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";

import { Container } from "./styles";

interface IFilmsProps {
  [key: string]: string;
  title: string;
  director: string;
  producer: string;
}

type IFilmsType = IFilmsProps & {
  character: string[];
  NumberCharacters?: string;
  NumberPlanets?: string;
  NumberStarShips?: string;
  NumberVehicles?: string;
  NumberSpecies?: string;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1200,
    alignContent: "center",
    marginTop: 50,
    margin: "0 auto",
    boxShadow: "6px 9px 16px 2px rgba(0,0,0,0.18);",
    borderRadius: "8px",
  },
});

const Films: React.FC = () => {
  const classes = useStyles();
  const [films, setFilms] = useState<IFilmsType[]>([]);
  const [asc, setAsc] = useState(false);
  const [nameHeaderClicked, setNameHeaderClicked] = useState("");

  useEffect(() => {
    api.get("films").then((response) => {
      const responseFilms = response.data.results;
      setFilms(
        responseFilms.map((film: any) => {
          return {
            ...film,
            NumberCharacters: String(film.characters.length),
            NumberPlanets: String(film.planets.length),
            NumberStarShips: String(film.starships.length),
            NumberVehicles: String(film.vehicles.length),
            NumberSpecies: String(film.species.length),
          };
        })
      );
    });
  }, []);

  function sortList(columnOrder: string | number) {
    const listOrdered = films.sort((a, b) => {
      if (!asc) {
        return a[`${columnOrder}`].localeCompare(b[`${columnOrder}`]);
      } else {
        return b[`${columnOrder}`].localeCompare(a[`${columnOrder}`]);
      }
    });

    setNameHeaderClicked(String(columnOrder));
    setFilms([...listOrdered]);
    setAsc(!asc);
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={nameHeaderClicked === "title"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={nameHeaderClicked === "director"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("director")}
                >
                  Director
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={nameHeaderClicked === "producer"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("producer")}
                >
                  Producer
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={nameHeaderClicked === "NumberCharacters"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("NumberCharacters")}
                >
                  Characters
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={nameHeaderClicked === "NumberPlanets"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("NumberPlanets")}
                >
                  Planets
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={nameHeaderClicked === "NumberStarShips"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("NumberStarShips")}
                >
                  StarShips
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={nameHeaderClicked === "NumberVehicles"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("NumberVehicles")}
                >
                  Vehicles
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={nameHeaderClicked === "NumberSpecies"}
                  direction={asc ? "asc" : "desc"}
                  onClick={() => sortList("NumberSpecies")}
                >
                  Species
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {films.map((film) => (
              <TableRow key={film.title}>
                <TableCell component="th" scope="row">
                  {film.title}
                </TableCell>
                <TableCell>{film.director}</TableCell>
                <TableCell>{film.producer}</TableCell>
                <TableCell align="center">{film.NumberCharacters}</TableCell>
                <TableCell align="center">{film.NumberPlanets}</TableCell>
                <TableCell align="center">{film.NumberStarShips}</TableCell>
                <TableCell align="center">{film.NumberVehicles}</TableCell>
                <TableCell align="center">{film.NumberSpecies}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Films;
