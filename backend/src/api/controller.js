// Dependencies
const { baseResponse } = require('../lib/util');

/**
 * API Controllers.
 * @param {Object} interfaces - commands and queries interface.
 */
module.exports = (interfaces) => ({
    /**
     * Global method for commands qnd queries execution.
     * @param {string} methodName - Method name taht fits on object 'requisitions'
     * @param {Object} req - express requisition.
     * @param {Object} res - express response.
     */
    executar: async (methodName, req, res) => {
        const requisition = {
            /**
             * GET ...
             * @param {object} req - express requisition.
    	     * @returns {Object} {status: {codigo: number, mensagem: string}, dados: Object}.
             */
            gravarCliente: async (req) => {
				// const { id, uf, nome, cidade, cnpjCpf, identificacao } = req.body;
                // const r = await interfaces.entradaComandos.executar('gravarCliente', {
                //     dadosCliente: {
                //         id: id,
                //         uf: uf,
                //         nome: nome,
                //         cidade: cidade,
                //         cnpjCpf: cnpjCpf,
                //         identificacao: identificacao
                //     }
                // });
                // return r;
                return null;
            },
        }
        // Global error treatment
        try {
            const r = await requisition[methodName](req);
            return res.status(r.status.codigo).json(baseResponse(
                r.status.codigo,
                r.status.mensagem,
                { data: r.data }
            ));
        } catch (err) {
            console.error('[ERRO]', '[api.controle.executar]', `[${err.message}]`, err);
			return res.status(500).json(baseResponse(500, 'Ops.. error while using the REST Service.'));
        }
    }

});
