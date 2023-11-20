import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import ImGG2 from '../../../../assets/images/ban1.png';
import ImGG3 from '../../../../assets/images/ban2.png';
import ImGG from '../../../../assets/images/ban3.png';
import Container from 'react-bootstrap/esm/Container';


function DarkVariantExample() {
    return (
        <Container fluid>
        <Banner >
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <BanImgDiv>
                    <BanImg
                        className="d-block w-100"
                        src={ImGG}
                        alt="First slide"
                    />
                </BanImgDiv>
            </Carousel.Item>
            <Carousel.Item>
                <BanImgDiv>
                    <BanImg
                        className="d-block w-100"
                        src={ImGG2}
                        alt="Second slide"
                    />
                </BanImgDiv>
            </Carousel.Item>
            <Carousel.Item>
                <BanImgDiv>
                    <BanImg
                        className="d-block w-100"
                        src={ImGG3}
                        alt="Third slide"
                    />
                </BanImgDiv>
            </Carousel.Item>
        </Carousel>
        </Banner>
        </Container>
    );
}
const Banner = styled.div`
    padding-top: 10px;
    padding-bottom: 20px;
`
const BanImgDiv = styled.div`
    min-height: 20vh;
    width: 100%;
`
const BanImg = styled.img`
    height: 30vh;
    border-radius: 20px;
    image-rendering: auto;
    object-fit: cover;
`

export default DarkVariantExample;