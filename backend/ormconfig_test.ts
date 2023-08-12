const ormconfig_test: any = {
    type: 'postgres',
    host: 'localhost',
    port: 5431,
    username: 'root',
    password: '1234567',
    database: 'climatempo_test',
    autoLoadEntities: true,
    autoLoadModels: true,
    synchronize: true,
    dropSchema: true,
}

export default ormconfig_test;