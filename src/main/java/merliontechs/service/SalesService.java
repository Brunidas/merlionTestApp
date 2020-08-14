package merliontechs.service;

import merliontechs.domain.Sales;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Sales}.
 */
public interface SalesService {

    /**
     * Save a sales.
     *
     * @param sales the entity to save.
     * @return the persisted entity.
     */
    Sales save(Sales sales);

    /**
     * Get all the sales.
     *
     * @return the list of entities.
     */
    List<Sales> findAll();


    /**
     * Get the "id" sales.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Sales> findOne(Long id);

    /**
     * Delete the "id" sales.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
