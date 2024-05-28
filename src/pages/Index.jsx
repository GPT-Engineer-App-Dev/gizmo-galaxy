import { Box, Container, Flex, Heading, HStack, Image, Link, SimpleGrid, Text, VStack, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone",
    category: "smartphone",
    description: "Latest model with advanced features",
    price: 699,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop",
    category: "laptop",
    description: "High performance laptop for professionals",
    price: 999,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Smartwatch",
    category: "smartwatch",
    description: "Stylish smartwatch with health tracking",
    price: 199,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Headphones",
    category: "headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 299,
    image: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value.split("-");
    setPriceRange([parseInt(value[0]), parseInt(value[1])]);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = category ? product.category === category : true;
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesPriceRange && matchesSearchQuery;
  });

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" bg="gray.800" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="lg">ElectroShop</Heading>
        <HStack spacing={8}>
          <Link as={RouterLink} to="/">Home</Link>
          <Link as={RouterLink} to="/products">Products</Link>
          <Link as={RouterLink} to="/about">About Us</Link>
          <Link as={RouterLink} to="/contact">Contact</Link>
        </HStack>
      </Flex>

      <Box as="section" mt={8}>
        <Input
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          mb={4}
        />
        <Box mb={4}>
          <Select placeholder="Select category" onChange={handleCategoryChange} mb={4}>
            <option value="smartphone">Smartphone</option>
            <option value="laptop">Laptop</option>
            <option value="smartwatch">Smartwatch</option>
            <option value="headphones">Headphones</option>
          </Select>
          <Select placeholder="Select price range" onChange={handlePriceRangeChange}>
            <option value="0-199">$0 - $199</option>
            <option value="200-499">$200 - $499</option>
            <option value="500-999">$500 - $999</option>
            <option value="1000-10000">$1000+</option>
          </Select>
        </Box>
        <Heading as="h2" size="xl" mb={4}>Featured Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={product.image} alt={product.name} />
              <Box p={6}>
                <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
                <Text>{product.description}</Text>
                <Text fontWeight="bold" mt={2}>${product.price}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;