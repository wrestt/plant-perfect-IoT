CREATE DATABASE plantdata;

CREATE TABLE pi (
	  id SERIAL PRIMARY KEY,
	  idpi TEXT
);

CREATE TABLE light (
	  id SERIAL PRIMARY KEY,
	  my_date TIMESTAMP default current_timestamp,
	  idpi TEXT,
	  ir NUMERIC,
	  lux NUMERIC,
	  visible NUMERIC
);

CREATE TABLE air (
	  id SERIAL PRIMARY KEY,
	  my_date TIMESTAMP default current_timestamp,
	  idpi TEXT,
	  airtemp NUMERIC,
	  airhumidity NUMERIC
);

CREATE TABLE soil (
	  id SERIAL PRIMARY KEY,
	  my_date TIMESTAMP default current_timestamp,
	  idpi TEXT,
	  soilhumidity NUMERIC
);

CREATE TABLE water (
  id SERIAL PRIMARY KEY,
  my_date TIMESTAMP default current_timestamp,
  idpi TEXT,
  present NUMERIC,
  watering NUMERIC
);
