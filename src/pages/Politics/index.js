import React,  {useEffect} from "react";
import GradientHeader from "../../Components/GradientHeader";
import Footer from "../../Components/Footer";
import "./styles.scss";

export default function Politics() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <>
            <GradientHeader />
            <section id="politics">
                <div className="content">
                    <div className="navigation">
                        <header>Navege entre os tópicos</header>
                        <div className="navigation-item">
                            <a href="#about">
                                Políticas de Privacidade – Estímulo
                            </a>
                        </div>
                        <div className="navigation-item">
                            <a href="#coleta">
                                Coleta e Utilização de Informações do Usuário
                            </a>
                        </div>
                        <div className="navigation-item">
                            <a href="#comunicacao">Comunicação</a>
                        </div>
                        <div className="navigation-item">
                            <a href="#seguranca">Segurança</a>
                        </div>
                    </div>
                    <div className="sections">
                        <div className="section" id="sobre">
                            <div className="section-header">
                                Políticas de Privacidade – Estímulo
                            </div>
                            <div className="section-body">
                                <div className="section-item">
                                    Na Estímulo, a privacidade é um assunto de
                                    grande importância! Por esta razão, este
                                    documento busca detalhar aos Usuários como
                                    suas informações são utilizadas em nosso
                                    site. É recomendado que os Usuários leiam
                                    atentamente.
                                </div>
                                <div className="section-item">
                                    Esta Política de Privacidade se aplica a
                                    todos os Usuários do site da Estimulo
                                    (https://www.estimulo.herokuapp.com),
                                    contendo informações claras sobre coleta,
                                    uso, armazenamento e proteção de dados. A
                                    Estimulo poderá alterar esta Política de
                                    Privacidade a qualquer tempo, ficando a
                                    cargo do Usuário responsável em consultar
                                    regularmente estes termos a fim de verificar
                                    se concorda ou não com as alterações
                                    realizadas e se pretende continuar acessando
                                    o site.
                                </div>
                                <div className="section-item">
                                    Os usuários do site da Estimulo podem
                                    acessá-lo para finalidades distintas, para
                                    cadastrar um trabalho científico ou ainda
                                    navegar, sendo certo que em quaisquer destes
                                    usos autorizam expressamente que a Estimulo
                                    colete e armazene seus dados de navegação e
                                    suas informações pessoais, utilizando-os na
                                    forma prevista nesta Política de
                                    Privacidade.
                                </div>
                                <div className="section-item">
                                    Esta Política se aplica a todos os serviços
                                    e aplicações disponibilizados pelo site da
                                    Estimulo.
                                </div>
                            </div>
                        </div>
                        <div className="section" id="coleta">
                            <div className="section-header">
                                Coleta e Utilização de Informações do Usuário
                            </div>
                            <div className="section-item">
                                Ao utilizar o site da Estímulo para quaisquer
                                das finalidades mencionadas acima, serão
                                coletadas informações pessoais e ou intelectuais
                                que poderão incluir, entre outras, nome,
                                endereço de e-mail, telefone para contato, sexo,
                                data de nascimento, endereço, número de CPF, não
                                se exaurindo os dados supracitados. Os dados
                                informados pelo usuário são de sua exclusiva
                                responsabilidade.
                            </div>
                            <div className="section-item">
                                Ao preencher um cadastro o usuário poderá ainda
                                efetuar o upload de uma foto que permanecerá
                                vinculada ao seu perfil no site da Estímulo. O
                                nome e a foto do perfil poderão ser exibidos nas
                                aplicações disponibilizadas pela Estímulo,
                                incluindo, mas não se limitando à área usuário e
                                no canal de contato com os outros integrantes.
                            </div>
                            <div className="section-item">
                                Os dados pessoais informados pelo candidatos
                                serão compartilhados com os usuários da
                                plataforma. Quando da não vinculação na
                                plataforma, os dados serão armazenados dentro da
                                plataforma Estímulo.
                            </div>
                            <div className="section-item">
                                É possível que as informações dos usuários
                                permaneçam armazenadas mesmo após o encerramento
                                de uma conta de usuário. Este armazenamento
                                poderá ocorrer caso seja mandatória ao
                                cumprimento de obrigações de natureza judicial,
                                legal ou regulatória, para evitar fraudes ou uso
                                indevido, bem como para assegurar o estrito
                                cumprimento desta Política de Privacidade e
                                demais contratos que regulem a relação entre a
                                Estímulo e os usuários.
                            </div>
                            <div className="section-item">
                                A Estímulo disponibiliza ainda o acesso por meio
                                de credenciais utilizada pelo SUAP. Ao efetuar a
                                vinculação com uma conta do SUAP, o usuário
                                autorizará a Estímulo a coletar suas informações
                                pessoais, tais como, mas não se limitando a seu
                                nome, e-mail institucional, matrículao,
                                localidade do campus, todas e quaisquer adições
                                de campos cadastrais serão de total
                                consentimento do usuário. A Estímulo não fará
                                qualquer tipo de publicação ou compartilhamento
                                na respectiva rede social em nome do usuário sem
                                a sua autorização expressa.
                            </div>
                            <div className="section-item">
                                O usuário concorda que as informações fornecidas
                                diretamente nos perfis mantidos nas redes
                                sociais serão regidas pelos Termos de Uso e
                                Políticas de Privacidade da respectiva rede
                                social.
                            </div>
                        </div>
                        <div className="section" id="comunicacao">
                            <div className="section-header">Comunicação</div>
                            <div className="section-item">
                                Toda e qualquer comunicação da Estímulo aos seus
                                usuários se dará apenas com o intuito de
                                oferecer notificações pertinentes sobre a
                                utilização da sua plataforma e dos seus produtos
                                e funcionalidades, podendo ainda enviar
                                mensagens informativas, como por
                                exemplo, trabalhos em busca de novos integrantes. Fica desde já
                                ressaltado que a Estímulo não faz o envio de
                                nenhum tipo de SPAM.
                            </div>
                            <div className="section-item">
                                As mensagens da Estímulo são enviadas apenas
                                para o e-mail cadastrado pelo usuário. A
                                Estímulo não coleta e-mails de listas de
                                discussão, sites não comerciais e não pratica
                                qualquer tipo de compra ou venda de listas de
                                e-mails.
                            </div>
                            <div className="section-item">
                                Os comunicados da Estímulo são enviados apenas a
                                e-mails cadastrados pelos próprios usuários e
                                seu recebimento pode ser interrompido a qualquer
                                momento, por meio de um link localizado no
                                cabeçalho das mensagens, podendo haver
                                alterações no meio de interrupção sem prévio
                                aviso. Toda solicitação de exclusão de e-mail
                                será prontamente atendida.
                            </div>
                            <div className="section-item"></div>
                        </div>
                        <div className="section" id="seguranca">
                            <div className="section-header">Segurança</div>
                            <div className="section-item">
                                O acesso pelo usuário ao seu cadastro se dará
                                por meio de login e senha confidenciais e de uso
                                pessoal, ficando este responsável pela sua
                                guarda e sigilo.
                            </div>
                            <div className="section-item">
                                A Estímulo sempre observará as normas aplicáveis
                                à segurança dos seus dados, além de utilizar de
                                medidas de segurança para navegação, visando a
                                proteção contra qualquer acesso não autorizado.
                                O usuário está ciente da suscetibilidade a
                                falhas e vulnerabilidades por tratar-se de
                                conteúdos disponibilizados na internet, porém, a
                                Estímulo se compromete a envidar sempre os seus
                                melhores esforços a fim de evitá-los.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
