import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import ImGG from 'file:///home/rabeeh/Pictures/flip.webp';
import ImGG2 from 'file:///home/rabeeh/Pictures/flip2.webp';
import Container from 'react-bootstrap/esm/Container';


function DarkVariantExample() {
    return (
        <Container>
        <Banner>
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
                        src={ImGG}
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
    height: 20vh;
    image-rendering: auto;
`

export default DarkVariantExample;