package merliontechs.service.impl;

import merliontechs.service.SalesService;
import merliontechs.domain.Sales;
import merliontechs.repository.SalesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Sales}.
 */
@Service
@Transactional
public class SalesServiceImpl implements SalesService {

    private final Logger log = LoggerFactory.getLogger(SalesServiceImpl.class);

    private final SalesRepository salesRepository;

    public SalesServiceImpl(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    @Override
    public Sales save(Sales sales) {
        log.debug("Request to save Sales : {}", sales);
        return salesRepository.save(sales);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Sales> findAll() {
        log.debug("Request to get all Sales");
        return salesRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Sales> findOne(Long id) {
        log.debug("Request to get Sales : {}", id);
        return salesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Sales : {}", id);
        salesRepository.deleteById(id);
    }
}
