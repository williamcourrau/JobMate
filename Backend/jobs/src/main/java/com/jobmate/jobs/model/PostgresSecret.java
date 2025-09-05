package com.jobmate.jobs.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PostgresSecret {
    private String username;
    private String password;
    private String engine;
    private String host;
    private int port;
    @JsonProperty("dbname")
    private String dbName;
}
