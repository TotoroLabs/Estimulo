import React, { useEffect, useState } from "react";
import GradientHeader from "../../Components/GradientHeader";
import Footer from "../../Components/Footer";
import "./styles.scss";

export default function TOS() {
    const [isloading, setIsloading] = useState(true);
    useEffect(() => {
        if (isloading === true) {
            window.scrollTo(0, 0);
            setIsloading(false);
        }
    }, [isloading]);
    return (
        <>
            <GradientHeader
                title={"Termos de uso"}
                text={"Termos Gerais de uso da plataforma Estimulo"}
            />
            <section id="tos">
                <div className="content">
                    <div className="navigation">
                        <header>Navege entre os tópicos</header>
                        <div className="navigation-item">
                            <a href="#about">1. Destinação da plataforma</a>
                        </div>
                        <div className="navigation-item">
                            <a href="#coleta">2. Cadastro da contratante</a>
                        </div>
                        <div className="navigation-item">
                            <a href="#comunicacao">
                                3. Direitos e Obrigações da Estimulo
                            </a>
                        </div>
                        <div className="navigation-item">
                            <a href="#seguranca">4. Da vigência</a>
                        </div>
                    </div>
                    <div className="sections">
                        <div className="section" id="sobre">
                            <div className="section-header">
                                1. Destinação da plataforma
                            </div>
                            <div className="section-body">
                                <div className="section-item">
                                    A Estimulo oferece um serviço que
                                    conecta estudantes e professores pertencentes ao IFRN
                                    através de um processo publicação de projetos científicos. A plataforma atua
                                    apenas como uma ferramenta para facilitar a
                                    comunicação entre pesquisadores, garantindo a troca de informações, crescimento coletivo e intercâmbio de aprendizado.
                                </div>
                            </div>
                        </div>
                        <div className="section" id="coleta">
                            <div className="section-header">
                                2. Cadastro do orientador/pesquisador
                            </div>
                            <div className="section-item">
                                Os serviços oferecidos pela Estimulo serão
                                voltados a integrantes da rede do IFRN, nos quais estes cabem por ter os seguintes requerimentos.
                            </div>
                            <div className="section-item">
                                2.1 O USUÁRIO deverá:
                            </div>
                            <div className="section-item">
                                a) Ter vínculo com caráter ativo na rede do IFRN.
                            </div>
                            <div className="section-item">
                                b) Estar matriculado em algum plano de educação com oferecimento exclusivo do IFRN.
                            </div>
                            <div className="section-item">
                                c) Possuir cadastro e acesso ao SUAP.
                            </div>
                            <div className="section-item">
                                d) Garantir a veracidade e atualização das
                                informações fornecidas.
                            </div>
                            <div className="section-item">
                                e) Concordar em manter como confidenciais todas
                                as informações obtidas a partir da utilização do
                                site ("Site") e dos serviços (“Serviços”) da
                                Estimulo. Concordar que vai usar qualquer
                                conteúdo enviado por futuros usuários, de
                                acordo com as leis de privacidade e proteção de
                                dados.
                            </div>
                            <div className="section-item">
                                f) Concordar em notificar a Estimulo no caso
                                de suspeita de uso não autorizado da sua conta.
                            </div>
                            <div className="section-item">
                                g) De modo a poder utilizar Estimulo
                                como um PESQUISADOR ou ORIENTADOR, a USUÁRIO deve criar um
                                cadastro. O cadastro é gratuito. A Estimulo
                                reserva o direito de aceitar ou rejeitar o
                                cadastro para utilizar o site e serviços da
                                Estimulo. Se a sua inscrição for aceita, os usuários pré-registrados terão permissão para licitar os
                                serviços de potenciais colaboradores que
                                postaram seus perfis no site Estimulo.com.br.
                            </div>
                            <div className="section-item">
                                2.2 A transmissão de informações incompletas
                                e/ou inverídicas será considerada como infração,
                                o que poderá ocasionar na desativação da conta,
                                em prazo hábil, sem prejuízo de outras medidas a
                                serem adotadas.
                            </div>
                            <div className="section-item">
                                2.3 É de inteira responsabilidade do usuário
                                o uso de sua conta, não responsabilizando a
                                Estimulo por qualquer mau uso, perda ou dano
                                resultante de sua falha em cumprir as obrigações
                                ora estipuladas.
                            </div>
                            <div className="section-item">
                                2.4 Na eventualidade de desativação da conta do usuário por qualquer infração, a Estimulo
                                poderá cancelar o fornecimento dos serviços,
                                ficando resguardado o direito de cobrar qualquer
                                serviço já concluído.
                            </div>
                        </div>
                        <div className="section" id="comunicacao">
                            <div className="section-header">
                                3. Direitos e Obrigações da Estimulo
                            </div>
                            <div className="section-item">
                                3.1 A Estimulo fornece aos seus usuários, os resultados de busca e as
                                ferramentas de software que que lhe permitem
                                encontrar e se conectar com os potenciais
                                outros usuários da plataforma.
                            </div>
                            <div className="section-item">
                                3.2 Nenhuma obrigação contratual é criada tanto
                                para o voluntário em potencial quanto para a
                                criador do projeto pela utilização do Serviço. O
                                criador do projeto não é obrigado a
                                aceitar o convite por parte dos usuários voluntariados, quanto o contrário. No final do
                                processo, o criador do projeto
                                pode escolher qual o voluntário deseja recrutar.
                            </div>
                            <div className="section-item">
                                3.3 Quaisquer acordos criados entre um
                                criador de projeto e um futuro voluntário não são
                                vinculativos a Estimulo. A Estimulo não é
                                responsável por, ou obrigada a cumprir,
                                quaisquer acordos entre um criador e um
                                voluntário. O criador não
                                considerará a Estimulo, nem a Estimulo
                                deverá ser interpretado como uma parte dessas
                                operações, com ou sem a Estimulo receber
                                alguma forma de remuneração.
                            </div>
                        </div>
                        <div className="section" id="vigencia">
                            <div className="section-header">
                                4 . DA VIGÊNCIA.
                            </div>
                            <div className="section-item">
                                4.1 Vigência. Este Termo de Uso vigorará por
                                tempo indeterminado.{" "}
                            </div>
                            <div className="section-item">
                                4.2 Resilição. Este Termo de Uso poderá ser
                                resilido tanto pelo Usuário quanto pela
                                Estimulo a qualquer tempo, de forma imediata
                                sem aviso prévio, mediante a extinção do
                                cadastro do Usuário, com a respectiva exclusão
                                dos dados cadastrais, sendo que a Estimulo
                                terá a faculdade de suspender ou extinguir a
                                plataforma Estimulo a qualquer tempo, mediante
                                aviso prévio de 30 dias, sem que disso decorra
                                qualquer direito ou expectativa de direito para
                                o Usuário. A resilição disciplinada nesta
                                cláusula não conferirá a nenhuma das partes o
                                direito de receber qualquer indenização ou
                                valor, salvo o quanto previsto neste Termo de
                                Uso.
                            </div>
                            <div className="section-item">
                                4.3 Rescisão por justa causa. Sem prejuízo do
                                disposto neste Termo de Uso, e do pagamento de
                                eventuais indenizações por perdas e danos
                                eventualmente sofridos pelas partes, o
                                inadimplemento de qualquer norma em vigor e/ou
                                qualquer uma das obrigações previstas neste
                                Termo de Uso ou dele decorrentes, facultará à
                                parte prejudicada o direito de considerar este
                                Termo de Uso rescindido de pleno direito, por
                                justa causa, sem a necessidade de aviso prévio
                                ou cumprimento antecedência mínima.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
