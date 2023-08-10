const ormconfig: any = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'root',
    password: '1234567',
    database: 'climatempo',
    autoLoadEntities: true,
    autoLoadModels: true,
    synchronize: true,
}

export default ormconfig;