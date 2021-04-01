import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import TicketList from 'components/organisms/TicketList';
import { Container } from '@material-ui/core';
import { doWithServerSide } from 'services';
import { TicketClient, getData } from 'clients';
import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const ticketRes = await TicketClient.getListTicket(ctx);
    console.log(ticketRes);
    const data = getData(ticketRes);
    return {
      props: {
        tickets: data,
      },
    };
  });
}

const MyTicket = ({ user, isMobile, tickets }) => {
  const title = 'Danh sách phản hồi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={5} title="Danh sách phản hồi" name={user?.name}>
            <TicketList tickets={tickets} user={user} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyTicket);
